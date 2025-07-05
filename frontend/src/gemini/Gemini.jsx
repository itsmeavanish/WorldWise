import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { useCities } from '../contexts/CitiesContext';

import Spinner from '../components/Spinner';
import PageNav from '../components/PageNav';
import styles from "./Gemini.module.css";
import HotelList from './SubHotelList';
import TripDetails from './TripDetails';
import { useAuth } from '../contexts/useAuth';


export default function Gemini() {
  const genAI = useMemo(
    () => new GoogleGenerativeAI("AIzaSyCeuJWAwNPnhh0mflQkltpjiKwLsivN-dU"),
    []
  );
  const model = useMemo(() => genAI.getGenerativeModel({ model: "gemini-2.5-flash" }), [genAI]);
  const {user}=useAuth();
  const [state, setState] = useState({
    hotels: [],
    loading: true,
    error: null,
  });

  const { currentcity } = useCities();
  const { cityName } = currentcity;

async function fetchImage(query) {
  const API_KEY1 = "AIzaSyAALm-uGStRBFII7gU2QB-xJ_m7ERYmQF8";
  const API_KEY = "AIzaSyCeuJWAwNPnhh0mflQkltpjiKwLsivN-dU";
  const CX = "613aebe8e8d6f4898";
  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&searchType=image&key=${API_KEY}&cx=${CX}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      return data.items[0].link; // Return the first image URL
    }
    return null;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}
  const prompt = useMemo(()=> `
"I need a detailed travel plan for ${cityName}. The plan should include the following:

1. **Weather Precautions:** Provide an overview of the current and expected weather conditions during the visit and suggest precautions (e.g., carry an umbrella, wear sunscreen, etc.).

2. **Day-by-Day Itinerary:** Create a plan for the required number of days, detailing:
   - Specific places to visit each day.
   - Best times to visit these places.
   - Activities to do at each location.
   - Travel tips specific to each location (e.g., traffic conditions, best routes, or local customs).
   - Include **image URLs obtained from a browser search (e.g., Google Images)** for high-quality images of each place to visit.

3. **Hotel Suggestions:** Provide a list of 5 hotels near the city center or popular attractions with the following details:
   - Name, address, and distance from key attractions.
   - Price range, rating, and amenities (e.g., Free Wifi, Pool, etc.).
   - A short description of the hotel.
   - Include **image URLs obtained from a browser search (e.g., Google Images)** for high-quality images of each hotel.

4. **Must-Visit Places:** Highlight iconic landmarks, cultural spots, restaurants, or hidden gems specific to ${cityName}, along with:
   - A brief description of why it's worth visiting.
   - Include **image URLs obtained from a browser search (e.g., Google Images)** for these places.

5. **Recommendations:**
   - Suggest local foods or drinks to try.
   - Highlight any unique experiences or seasonal events happening in the city during the visit.
   - Share practical tips like transportation options, safety tips, and how to interact with locals.

Please provide the response in the following JSON format:

{
  "weatherPrecautions": "Brief text about weather conditions and precautions",
  "hotels": [
    {
      "name": "Hotel Name",
      "address": "123 Main St, City",
      "distance": "2km from City Center",
      "priceRange": "8000-10000",
      "rating": 4.5,
      "amenities": ["Free Wifi", "Restaurant", "Pool"],
      "description": "Luxury hotel with stunning city views and world-class amenities.",
      "image": "Real image URL obtained via a browser search for the hotel."
    },
    {
      "name": "Another Hotel Name",
      "address": "456 Park Ave, City",
      "distance": "5km from Major Attraction",
      "priceRange": "4000-8000",
      "rating": 4.0,
      "amenities": ["Free Parking", "Gym", "Spa"],
      "description": "Comfortable stay with excellent amenities.",
      "image": "Real image URL obtained via a browser search for the hotel."
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "placesToVisit": [
        {
          "name": "Place Name",
          "description": "Why this place is worth visiting.",
          "bestTimeToVisit": "Morning/Afternoon/Evening",
          "activities": ["Activity 1", "Activity 2"],
          "tips": "Practical tips for visiting.",
          "image": "Real image URL obtained via a browser search for the place."
        },
        {
          "name": "Another Place Name",
          "description": "Why this place is worth visiting.",
          "bestTimeToVisit": "Morning/Afternoon/Evening",
          "activities": ["Activity 1", "Activity 2"],
          "tips": "Practical tips for visiting.",
          "image": "Real image URL obtained via a browser search for the place."
        }
      ]
    },
    {
      "day": 2,
      "placesToVisit": [/* Similar structure as above */]
    }
  ],
  "mustVisit": [
    {
      "name": "Iconic Place Name",
      "reason": "Why this is a must-visit spot.",
      "image": "Real image URL obtained via a browser search for the place."
    },
    {
      "name": "Restaurant Name",
      "reason": "Famous for its cuisine or ambiance.",
      "image": "Real image URL obtained via a browser search for the restaurant."
    }
  ],
  "recommendations": [
    "Recommendation 1",
    "Recommendation 2",
    "Recommendation 3"
  ]
}

**IMPORTANT:** Ensure that all image URLs are real and sourced through a browser search (e.g., Google Images or Bing) for high-quality, reliable images. Use images from trustworthy sources such as official websites, Google Maps, or prominent travel platforms."
`,[cityName]);

  const fetchHotels = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const result = await model.generateContent(prompt);
    const response=result.response.text();
    const cleanResponse = response
      .replace(/^[^{[]+/, "") // Remove pre-JSON text
      .replace(/[^}\]]+$/, "") // Remove post-JSON text
      .trim();
    const data=JSON.parse(cleanResponse);
    console.log("Parsed data:", data);
   const imageFetchPromises = [];
    for (const day of data.itinerary) {
      for (const place of day.placesToVisit) {
        imageFetchPromises.push(
          fetchImage(`${place.name} ${cityName}`).then((url) => {
            place.image = url;
          })
        );
      }
    }
    for (const hotel of data.hotels) {
      imageFetchPromises.push(
        fetchImage(`${hotel.name} ${cityName}`).then((url) => {
          hotel.image = url;
        })
      );
    }
    await Promise.all(imageFetchPromises);
  setState({ hotels: data.hotels, loading: false, error: null });
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setState({ hotels: [], loading: false, error: error.message });
    }
  }, [model, prompt,cityName]);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  const { hotels, loading, error } = state;
  console.log("Hotels fetched:", hotels);
  return (
   <div className={styles.gemini}>
      <div className={styles.header}>
        <PageNav />
      </div>
    
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className={styles.error}>Error: {error}</div>
      ) : (
        <span className='relative w-full h-fit top-36 left-0 p bg-rgba(15, 23, 42, 0.8)  '>
          <TripDetails />
          <HotelList hotels={hotels} />
        </span>
      )}
    </div>
  );
}
