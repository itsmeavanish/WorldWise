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

export default function CityItem({city}) {
  const {currentcity,deleteCity,loading}=useCities();
   const {cityName,date,emoji,id,position,email}=city
   const {user}=useAuth();
   function handleclick(e){
    e.preventDefault();
    deleteCity(id);
   }
   if (loading) return <Spinner />
   console.log("emails",user.email);
   
  return (
    <li style={{backgroundColor:"rgb(31, 41, 55)"}}>
      <Link to={`/AppLayout/cities/${id}?lat=${position.lat}&lng=${position.lng}`} className={`${styles.cityItem} ${id === currentcity.id ? styles["cityItem--active" ]:""}`}>
      <span className={styles.emoji}>{emoji}</span>
      <h3>
        {user.email=email?cityName:""}
      </h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn} onClick={handleclick}>&times;</button>
      </Link>
    </li>
  )
}
