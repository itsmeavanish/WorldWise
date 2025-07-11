import React, { useEffect } from 'react'
import PageNav from '../components/PageNav'
import { useCities } from '../contexts/CitiesContext'
import "./Trip.css"
import Tripdetails from '../Trip-Fetching-Firebase/TripShow';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
export default function Trip() {
  const {user,fetchTrip}=useAuth()
    const {currentcity}=useCities();
    const location = useLocation();
      const searchParams = new URLSearchParams(location.search);
      const cityName = searchParams.get("cityName");
   useEffect(() => {
     if (user._id) {
       if(cityName){
       fetchTrip(cityName)
     }
       else{
         fetchTrip(currentcity.cityName);
       }
     }
   }, [user._id,cityName, currentcity.cityName]);
  return (
    <div>
        <PageNav />
    <div className='trip'>
      <div className='header'>
        <h1>{cityName ? cityName :currentcity.cityName} Trip Plan</h1>
      </div>
      
      <Tripdetails />
    </div>

    </div>
  )
}
