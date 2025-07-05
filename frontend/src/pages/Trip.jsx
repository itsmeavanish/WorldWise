import React from 'react'
import PageNav from '../components/PageNav'
import { useCities } from '../contexts/CitiesContext'
import "./Trip.css"
import Tripdetails from '../Trip-Fetching-Firebase/TripShow';
export default function Trip() {
    const {currentcity}=useCities();

  return (
    <div>
        <PageNav />
    <div className='trip'>
      <h1>{currentcity.cityName} Travel Experience</h1>
      <Tripdetails />
    </div>

    </div>
  )
}
