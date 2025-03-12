/*import React from 'react'
import { useCities } from '../contexts/CitiesContext'
import { AI_PROMPT, chatSession } from './AIModel';

export default async function Gemini() {
  const {cities,loading}=useCities();
  const FINAL_PROMPT=AI_PROMPT
  .replace('{location',cities?.cityName)
  .replace('{totalDays',2)
  .replace('{traveler',"Avanish")
  
  console.log(cities);
  const result =await chatSession.sendMessage(FINAL_PROMPT)
  return (
    <div>
    </div>
  )
}*/