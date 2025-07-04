import axios from 'axios';
import React, { useEffect } from 'react'
import { useAuth } from '../contexts/useAuth';
import { useCities } from '../contexts/CitiesContext';
import { toast } from 'react-toastify';

export default function Tripfetch() {
    const {user}=useAuth();
    const {currentcity}=useCities();
    const API=process.env.API_BASE_URL ;
    
    async function fetchTrips() {
        try{
            const response=await axios.get(`${API}tripplan/firebase?userId=${user._id}&city=${currentcity.cityName}`);
            console.log("Fetched trip data:", response.data);
        }
        catch(error){
            toast.error("Error fetching trip data: " + error.message);
            console.error("Error fetching trip data:", error);
        }
    }
    useEffect(()=>{
        if (user && currentcity) {
            fetchTrips();
        }
    },[user, currentcity]);
  return (
    <div>
      Hello
    </div>
  )
}
