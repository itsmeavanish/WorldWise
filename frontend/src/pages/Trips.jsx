import React, { useEffect } from 'react'
import PageNav from '../components/PageNav'
import styles from "./Trips.module.css"
import { useAuth } from '../contexts/useAuth'
import { MapPin, Star } from 'lucide-react'
import SubTrips from '../components/SubTrips'
import { redirect, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function Trips() {
  const {savedTrips,fetchSavedTrips,trips}=useAuth()
  const navigate=useNavigate();
  useEffect(()=>{
    fetchSavedTrips()
  },[]);
  function handleRecentTrip(){
    if(trips){
      navigate("/tripplan")
    }
    else{
      toast("You have not visited any trip recently");
    }
  }
  return (

    <div className={styles.Trips}>
      <div className={styles.header}>
        <PageNav />
      </div>
      
          <div className={styles.container}>
              <div className={styles.wrapper}>
                  <div className={styles.titleencloser}>
                    <h1 className={styles.title}>Enjoy Your Trips</h1>
                    <button className='cta-button' onClick={handleRecentTrip}>See your recent trip</button>
                  </div>
                  <div className={styles.tripcontainer}>
                    <div className={styles.grid}>
                    {savedTrips.message!=="No trips found"?savedTrips.map((savedTrip,key,index)=>(<SubTrips savedTrip={savedTrip} key={savedTrip._id}/>)):savedTrips.message}
                    </div>
                  </div>
                </div>
            </div>
        </div>

  )
}
