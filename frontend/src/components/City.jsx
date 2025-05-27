import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCities } from '../contexts/CitiesContext';
import styles from "./City.module.css"
import Spinner from './Spinner';
import BackButton from './BAckButton';
const formatDate=(date)=>
  new Intl.DateTimeFormat("en",{
    day:"numeric",
    month:"long",
    yar:"numeric",
    weekday:"long",
  }).format(new Date(date));
export default function City() {
    const {id }=useParams();
    const{getCity,currentcity,loading}=useCities()
    useEffect(function(){
      getCity(id);
    },[id]);
    const {cityName,emoji,date,notes,email}=currentcity;
    if(loading) return <Spinner /> 
 
  return (
    <div className={styles.city} style={{background:"#1F2937"}} >
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
        <Link to="/hotelform" > Generate Your Travel Plan for this Trip</Link>
      </div>
      <div>
        <BackButton/>
      </div>
    </div>
  )
}

