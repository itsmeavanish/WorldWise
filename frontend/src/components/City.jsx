import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCities } from '../contexts/CitiesContext';
import styles from "./City.module.css"
import Spinner from './Spinner';
import BackButton from './BackButton';
import HotelForms from '../Forms/HotelForms';

const formatDate=(date)=>
  new Intl.DateTimeFormat("en",{
    day:"numeric",
    month:"long",
    yar:"numeric",
    weekday:"long",
  }).format(new Date(date));


  // onvert country code to flag emoji

  function countryCodeToFlag(countryCode) {
  if (!countryCode || typeof countryCode !== "string") return "";

  // Convert the country code to uppercase for consistency
  const upperCaseCode = countryCode.toUpperCase();

  // Validate that the input is a 2-character country code
  if (upperCaseCode.length !== 2) return "";

  // Convert country code characters to regional indicator symbols
  const offset = 127397; // Unicode offset for regional indicators
  const flag = upperCaseCode
    .split("")
    .map((char) => String.fromCodePoint(char.charCodeAt(0) + offset))
    .join("");

  return flag;
}

export default function City() {
    const {id}=useParams();
    const{getCity,currentcity,loading}=useCities();
    useEffect(function(){
      getCity(id);
    },[id]);
    const {cityName,emoji,date,notes}=currentcity;
 
  return (
    <>    <div className={styles.city} style={{background:"#1F2937"}} >
      <div className={styles.row}>
        <h6>CITYNAME</h6>
        <h3>
          <span>{emoji}</span> 
          {cityName}
        </h3>
      </div>
      <div className={styles.row}>
        <h6>You Went to {cityName} on  </h6>
        <p>{formatDate(date || null)}</p>
      </div>
      {
        notes && (
          <div className={styles.row}>
            <h6>Your Notes</h6>
            <p>{notes}</p>
           </div>
        )
      }
      <div className={styles.row}>
        <h6>
          Learn More
        </h6>
        <a href={"https://en.wikipedia.org/wiki/List_of_cities_in_India_by_population"} target='_blank' rel="noreferrer"> Check out {cityName} on Wikipedia</a>
        
      </div>
      <div className={styles.buttons}>
        <BackButton/>
        <button  className={styles.generate} > Generate Your Travel Plan for this Trip</button>
      </div>
    </div>
   
    </>

  )
}