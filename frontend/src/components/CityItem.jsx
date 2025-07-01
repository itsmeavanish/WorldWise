import React from 'react'
import styles from "./CityItem.module.css";
import { Link } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';
import Spinner from './Spinner';
import { useAuth } from '../contexts/useAuth';
const formatDate=(date)=>
  new Intl.DateTimeFormat("en",{
    day:"numeric",
    month:"long",
    yar:"numeric",
    weekday:"long",
  }).format(new Date(date));
  

  //Convert Country Code to Country Flag 


function emojiToFlagSymbol(emoji) {
  if (!emoji || typeof emoji !== "string") {
    console.error("Invalid input: Must be a valid emoji string.");
    return "❓"; // Placeholder for invalid input
  }

  // Convert emoji to regional indicator code points
  const codePoints = [...emoji]
    .map((char) => char.codePointAt(0))
    .filter((code) => code >= 127462 && code <= 127487); // Regional Indicator Range

  if (codePoints.length !== 2) {
    console.error("Invalid input: Not a valid emoji flag.");
    return "❓"; // Placeholder for non-flag emojis
  }

  // Convert back to regional indicator symbols (flag emoji)
  const flagSymbol = codePoints
    .map((code) => String.fromCodePoint(code))
    .join("");

  return flagSymbol;
}
export default function CityItem({city}) {
  const {currentcity,deleteCity,loading}=useCities();
   const {cityName,date,emoji,position}=city;
   
   const emojiFlag=emojiToFlagSymbol(emoji);
   console.log("flag",emojiFlag);
   const id=city._id;
   const {user}=useAuth();
   function handleclick(e){
    e.preventDefault();
    deleteCity(id);
   }
   if (loading) return <Spinner />
  return (
    <li style={{backgroundColor:"rgb(31, 41, 55)"}}>
      <Link to={`/AppLayout/cities/${id}?lat=${position.lat}&lng=${position.lng}`} className={`${styles.cityItem} ${id === currentcity.id ? styles["cityItem--active" ]:""}`}>
      <span className={styles.emoji}>{emojiFlag}</span>
    
      <h3 className={styles.name}>
        {cityName}
      </h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn} onClick={handleclick}>&times;</button>
      </Link>
    </li>
  )
}
