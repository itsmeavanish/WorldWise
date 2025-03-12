import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { useCities } from '../contexts/CitiesContext';

import Spinner from '../components/Spinner';
import PageNav from '../components/PageNav';
import styles from "./Gemini.module.css"
import SubHotelList from './SubHotelList';
import HotelList from './SubHotelList';
export default function Gemini() {
  const genAI = new GoogleGenerativeAI("AIzaSyCeuJWAwNPnhh0mflQkltpjiKwLsivN-dU");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const [hotels,sethotels]=useState([]);
const [loading,setloading]=useState(true)
const{ currentcity}=useCities();
console.log(currentcity);
const {cityName}=currentcity;
console.log(cityName);
const [city,setcity]=useState(cityName);
const prompt =`"I need a JSON list of hotels near ${city}.  Each hotel object in the list should have the following keys: 'name', 'address', 'distance','priceRange' ,'rating','website', and 'amenities' (which is an array of strings). Please provide a list of 5 hotels. The JSON output should match the following format:

    [
      {
        "id":"1",
        "name": "Hotel Example 1",
        "address": "123 Main St, Lucknow",
        "distance":4km /* from charbagh*/,
        "priceRange":8000-10000,
        "rating": 4.5,
        "webiste":"https:ugfuire.com",
        "amenities": ["Free Wifi", "Restaurant", "Pool"],
        "description":"Luxury hotel with stunning city views and world-class amenities"
      },
      {
        "id":"2",
        "name": "Hotel Example 2",
        "address": "456 Park Ave, Lucknow",
        "distance":10km /* from charbagh*/,
        "priceRange":4000-10000,
        "rating": 4.0,
        "webiste":"httpsjhjhvire.com",
        "amenities": ["Free Parking", "Gym", "Conference Room"],
         "description":"Luxury hotel with stunning city views and world-class amenities"
      }
      ]
"`;
useEffect(()=>{
  const fetchHotels=async ()=>{ 
    
   try{
    const result = await model.generateContent(prompt);
    const response=result.response.text();
     const cleanResponse = response
      .replace(/```json\n?|```/g, '').replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
    const data=JSON.parse(cleanResponse);
    sethotels(data);
   }
   catch(error){
    console.log(error);
   }
    finally{
      setloading(false)
    }
  }
  fetchHotels();
  
},[model,prompt]);
console.log(hotels);

  return (
    <div clasname={styles.gemini}>
    <div className={styles.header}>
        <PageNav />
      </div>
      <div className={styles.space}></div>
  {loading ? <Spinner />:<HotelList hotels={hotels}/>}
    </div>
  )
}