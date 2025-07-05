const { GoogleGenerativeAI } = require("@google/generative-ai");
const { db, bucket, FieldValue } = require("../firebase/firebaseConfig");
const { v4: uuidv4 } = require("uuid");
const fetch = require("node-fetch");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Fetch image from Google Custom Search
async function fetchImage(query) {
  const API_KEY = process.env.GOOGLE_SEARCH_API_KEY;
  const CX = process.env.GOOGLE_SEARCH_CX;
  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&searchType=image&key=${API_KEY}&cx=${CX}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data?.items?.[0]?.link || null;
  } catch (err) {
    console.error("Image fetch failed:", err);
    return null;
  }
}

// Build structured prompt for Gemini
function buildPrompt({ cityName, strength, tripType, numDays }) {
  return `
You are a travel planning assistant. Generate a detailed and engaging travel plan for a trip to ${cityName} that reflects a ${tripType} experience but also includes iconic and must-see places of the city. The trip is for a group of ${strength} people traveling for ${numDays} days.

✅ Return only a **valid JSON object** and nothing else.  
❌ Do not include markdown syntax, code blocks, or explanations.
The respnse must inclde 
 **Hotel Suggestions** (5 hotels with image, name, rating, location, description, amenities, etc.)
The JSON must follow this exact structure:

{
  "weatherPrecautions": "A paragraph of weather-related advice.",
  "hotels": [
    {
      "name": "Hotel Name",
      "image": "Image URL",
      "rating": "5 Stars",
      "location": "Hotel address or locality",
      "description": "Brief hotel summary",
      "amenities": ["WiFi", "Pool", "Breakfast", "Parking"]
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "theme": "Theme for the day",
      "bestVisitTimes": {
        "morning": "e.g., 9:00 AM - 12:00 PM",
        "afternoon": "e.g., 1:00 PM - 5:00 PM",
        "evening": "e.g., 6:00 PM onward"
      },
      "activities": [
        {
          "name": "Activity Name",
          "description": "Brief explanation of the activity",
          "travelTips": "Tips or guidance for the activity",
          "image": "Image URL"
        }
      ]
    }
  ],
  "mustVisit": [
    {
      "name": "Place Name",
      "image": "Image URL",
      "reason": "Why this place is a must-visit"
    }
  ],
  "recommendations": {
    "culturalTips": [
      "Tip 1",
      "Tip 2"
    ],
    "food": {
      "highlights": ["Dish 1", "Dish 2"],
      "luxuryDiningSpots": ["Restaurant 1", "Restaurant 2"]
    },
    "tripTypeHighlights": [
      "Highlight 1",
      "Highlight 2"
    ],
    "events": {
      "culturalEvents": [
        {
          "name": "Event Name",
          "description": "Details of the event",
          "date": "Optional"
        }
      ]
    }
  }
}

Make sure all keys are present and filled — if any data is not available, use a sensible placeholder.
  `;
}

// Main function to generate and store the trip plan
async function generateAndStoreTrip(cityName, strength, tripType, startDate, endDate, userId) {
  try {
     const numDays = Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = buildPrompt({ cityName, strength, tripType, numDays});

    const result = await model.generateContent(prompt);
    const rawText = result?.response?.text();

    if (!rawText) throw new Error("Empty response from Gemini");

    // Attempt parsing the raw text safely
    let json;
    try {
      let cleanText = rawText
  .replace(/```json\n?/g, '') // remove markdown code block start
  .replace(/```/g, '')        // remove markdown code block end
  .replace(/\*\*/g, '')       // remove bold markers
  .replace(/\n\s*\*/g, '\n-') // convert bullet style from '*' to '-'
  .replace(/\r?\n/g, ' ').trim();    // optional: flatten newlines (depends on your UI)
      json = JSON.parse(cleanText);
    } catch (err) {
      console.error("❌ Failed to parse Gemini response:", rawText);
      throw new Error("Failed to parse Gemini trip plan.");
    }

    // Enrich with images
    const imageTasks = [];

    // Hotels
    if (Array.isArray(json.hotels)) {
      json.hotels.forEach(hotel => {
        imageTasks.push(
          fetchImage(`${hotel.name} ${cityName}`).then(url => {
            hotel.image = url;
          })
        );
      });
    }

    // Itinerary
 if (Array.isArray(json.itinerary)) {
  json.itinerary.forEach(day => {
    if (Array.isArray(day.activities)) {
      day.activities.forEach(activity => {
        if (activity.name) {
          imageTasks.push(
            fetchImage(`${activity.name} ${cityName}`).then(url => {
              activity.image = url;
            })
          );
        }
      });
    }
  });
}

    // Must Visit
    if (Array.isArray(json.mustVisit)) {
      json.mustVisit.forEach(place => {
        imageTasks.push(
          fetchImage(`${place.name} ${cityName}`).then(url => {
            place.image = url;
          })
        );
      });
    }

    await Promise.all(imageTasks);

    // Save to Firebase Storage
    const filename = `trip-${cityName}-${Date.now()}.json`;
    const file = bucket.file(`trip-plans/${filename}`);
    await file.save(JSON.stringify(json), {
      metadata: {
        contentType: "application/json",
      },
    });

    // Save metadata to Firestore
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
    console.error("🚨 Trip generation error:", err);
    throw new Error("Failed to generate trip plan.");
  }
}

module.exports = {
  generateAndStoreTrip,
};
