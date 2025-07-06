import React, { useEffect } from 'react'
import PageNav from '../components/PageNav'
import styles from "./Trips.module.css"
import { useAuth } from '../contexts/useAuth'
import { MapPin, Star } from 'lucide-react'
export default function Trips() {
  const {savedTrips,fetchSavedTrips}=useAuth()
  useEffect(()=>{
    fetchSavedTrips();
    console.log("All fetched trips",trips)
  },[]);
  const {destination,strength,startDate,endDate,budget,tripType}=savedTrips;
  return (
    <div className={styles.gemini}>
      <div className={styles.header}>
        <PageNav />
      </div>
        <span className='relative w-full h-fit top-36 left-0 p bg-rgba(15, 23, 42, 0.8)  '>
          <div className={styles.container}>
              <div className={styles.wrapper}>
                  <h1 className={styles.title}>Enjoy Your Trips</h1>
                  <div className={styles.grid}>
                    <SubTrips savedTrips={savedTrips} />
                  </div>
                </div>
            </div>
        </span>
    </div>
  )
}
function SubTrips({savedTrips}){
const {destination,strength,startDate,endDate,budget,tripType}=savedTrips;
  <div 
      className={styles.card}
    >
      <div className={styles.imagecontainer}>
        <img 
          src=""
          alt={destination}
          className={styles.image}
        />
        <div className={styles.rating}>
          <span className={styles.ratingcontent}>
            <Star className={styles.starticon} />
            {budget} budget
          </span>
        </div>
      </div>

      <div className={styles.details}>
        <h2 className={styles.name}>{destination}</h2>
        <p className={styles.location}>
          <MapPin className={styles.mapicon} />
          {strength} strength
        </p>
        <p className={styles.description}>{startDate} to {endDate}</p>
        
        

        <div className={styles.footer}>
          <span className={styles.price}>{budget} budget</span>
          <button className={styles.bookbutton}>
            Open Your Trip
          </button>
        </div>
      </div>
    </div>
}
