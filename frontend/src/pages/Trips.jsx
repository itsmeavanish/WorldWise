import React, { useEffect } from 'react'
import PageNav from '../components/PageNav'
import styles from "./Trips.module.css"
import { useAuth } from '../contexts/useAuth'
import { MapPin, Star } from 'lucide-react'
/*export default function Trips() {
  const {fetchTripbyUser}=useAuth()
  useEffect(()=>{
    const trips=fetchTripbyUser();
    console.log("All fetched trips",trips)
  },[])

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
                    
                  </div>
                </div>
            </div>
        </span>
    </div>
  )
}
function SubTrips(){
  <div 
      className="hotel-card"
    >
      <div className="hotel-image-container">
        <img 
          src={image} 
          alt={name}
          className="hotel-image"
        />
        <div className="hotel-rating">
          <span className="rating-content">
            <Star className="star-icon" />
            {rating}
          </span>
        </div>
      </div>

      <div className="hotel-details">
        <h2 className="hotel-name">{hotel.name}</h2>
        <p className="hotel-location">
          <MapPin className="map-icon" />
          {address}
        </p>
        <p className="hotel-location ml-1">{distance} from station of city</p>
        <p className="hotel-description">{description}</p>
        
        

        <div className="hotel-footer">
          <span className="hotel-price">{priceRange} $</span>
          <button className="book-button" >
            Open Your Trip
          </button>
        </div>
      </div>
    </div>
}
*/