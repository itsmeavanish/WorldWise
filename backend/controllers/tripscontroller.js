const { GoogleGenerativeAI } = require("@google/generative-ai");
const { db, bucket, FieldValue } = require("../firebase/firebaseConfig");
const { v4: uuidv4 } = require("uuid");
const fetch = require("node-fetch");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Util: Fetch image from Google Custom Search
async function fetchImage(query) {
  const API_KEY = process.env.GOOGLE_SEARCH_API_KEY;
  const CX = process.env.GOOGLE_SEARCH_CX;

  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
    query
  )}&searchType=image&key=${API_KEY}&cx=${CX}`;
  const res = await fetch(url);
  const data = await res.json();
  return data?.items?.[0]?.link || null;
}

// Prompt builder
function buildPrompt({ cityName, strength, tripType, startDate, endDate }) {
  return `
I need a detailed and engaging travel plan for a trip to **${cityName}** that reflects a **${tripType}** experience but still covers key highlights and must-see places of the city. The plan should be suitable for a group of **${strength} people** traveling from **${startDate}** to **${endDate}**.

The response should include:

1. **Weather Precautions:**
   - Provide an overview of the expected weather between ${startDate} and ${endDate}.
   - Suggest practical weather-related precautions for travelers (e.g., raincoat, sunscreen, hydration).

2. **Day-by-Day Itinerary:**
   - Organize plans for each day of the trip.
   - Recommend **places to visit** each day that align partially with the ${tripType} type (like spas for relaxing, trekking for adventurous), but also include general iconic landmarks and cultural spots to get a complete feel of the city.
   - Mention **best times to visit** each place, **activities**, and local **travel tips**.
   - Add **image URLs** using Google Images for each place (as real links, not placeholders).

3. **Hotel Suggestions:**
   - List 5 hotels near popular attractions or the city center.
   - Include: name, address, distance from key attractions, price range, rating, amenities, short description.
   - Add a **real image URL** via browser search for each hotel.

4. **Must-Visit Places:**
   - Mention 4-5 iconic places, restaurants, or hidden gems in ${cityName}.
   - Add a brief description and explain why they’re worth visiting.
   - Provide a **real image URL** for each.

5. **Trip-Type Relevant Highlights (Optional Section):**
   - Based on the ${tripType} (e.g., relaxing: spas/gardens, adventurous: treks/water activities), mention a few extra suggestions that enhance the user’s preference.

6. **Recommendations:**
   - Suggest local foods or drinks to try.
   - Mention any ongoing events during ${startDate} to ${endDate} (seasonal festivals, etc.).
   - Give practical city-wide tips on transportation, safety, language, or cultural etiquette.

Respond strictly in this JSON format:

{
  "weatherPrecautions": "...",
  "hotels": [...],
  "itinerary": [...],
  "mustVisit": [...],
  "recommendations": [...]
}

**IMPORTANT:** All images must be real URLs obtained through browser searches like Google Images or Bing (not placeholders). Use trustworthy sources like official websites, Google Maps, or travel platforms.

`;
}



// Main function: generate and store trip
async function generateAndStoreTrip(cityName,strength,tripType,startDate,endDate, userId) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = buildPrompt(cityName);

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();
    const cleanText = rawText.replace(/^[^{[]+/, "").replace(/[^}\]]+$/, "").trim();

    const json = JSON.parse(cleanText);

    // Fetch image URLs
    const imagePromises = [];

    json.hotels.forEach(hotel =>
      imagePromises.push(
        fetchImage(`${hotel.name} ${cityName}`).then(url => {
          hotel.image = url;
        })
      )
    );

    json.itinerary.forEach(day => {
      day.placesToVisit.forEach(place => {
        imagePromises.push(
          fetchImage(`${place.name} ${cityName}`).then(url => {
            place.image = url;
          })
        );
      });
    });

    for (const place of json.mustVisit) {
      imagePromises.push(
        fetchImage(`${place.name} ${cityName}`).then(url => {
          place.image = url;
        })
      );
    }

    await Promise.all(imagePromises);

    // Save to Firebase Storage
    const filename = `trip-${cityName}-${Date.now()}.json`;
    const file = bucket.file(`trip-plans/${filename}`);
    await file.save(JSON.stringify(json), {
      metadata: {
        contentType: "application/json",
      },
    });

    // Save metadata in Firestore
    await db.collection("trip_metadata").add({
      userId,
      city: cityName,
      filePath: `trip-plans/${filename}`,
      createdAt: FieldValue.serverTimestamp(),
    });

    return {
      message: "Trip generated and saved",
      filePath: `trip-plans/${filename}`,
    };
  } catch (err) {
    console.error("Trip generation error:", err); // 👈 Important for debugging
    throw new Error("Failed to generate trip plan.");
  }

}
module.exports = {
  generateAndStoreTrip,
};
