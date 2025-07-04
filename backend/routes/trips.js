const express = require("express");
const { generateAndStoreTrip } = require("../controllers/tripscontroller");
const { db, bucket } = require("../firebase/firebaseConfig"); // ✅ required

const router = express.Router();

// POST - Generate & Save Trip
router.post("/tripplan/firebase", async (req, res) => {
  const { cityName,trripType,strength,startDate,endDate, userId } = req.body;

  if (!cityName || !userId) {
    return res.status(400).json({ error: "Missing cityName or userId" });
  }

  try {
    const result = await generateAndStoreTrip(cityName,trripType,strength,startDate,endDate, userId);
    res.status(200).json(result);
  } catch (err) {
    console.error("Trip generation error:", err);
    res.status(500).json({ error: err.message || "Failed to generate trip." });
  }
});

// GET - Fetch Trip by userId + city
router.get("/tripplan/firebase", async (req, res) => {
  const { userId, city } = req.query;

  if (!userId || !city) {
    return res.status(400).json({ error: "Missing userId or city" });
  }

  try {
    const snapshot = await db
      .collection("trip_metadata")
      .where("userId", "==", userId)
      .where("city", "==", city)
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "Trip not found" });
    }

    const tripMeta = snapshot.docs[0].data();
    const file = bucket.file(tripMeta.filePath);
    const [contents] = await file.download();
    const tripData = JSON.parse(contents.toString("utf8"));

    res.status(200).json({
      trip: tripData,
      metadata: {
        filePath: tripMeta.filePath,
        createdAt: tripMeta.createdAt,
        city: tripMeta.city,
        userId: tripMeta.userId,
      },
    });
  } catch (err) {
    console.error("Error fetching trip:", err);
    res.status(500).json({ error: "Failed to fetch trip." });
  }
});

module.exports = router;
