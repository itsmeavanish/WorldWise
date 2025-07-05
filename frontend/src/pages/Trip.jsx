import React from 'react'
import PageNav from '../components/PageNav'
import { useCities } from '../contexts/CitiesContext'
import Tripfetch from '../Trip-Fetching-Firebase/tripfetch';
import "./Trip.css"
export default function Trip() {
    const {currentcity}=useCities();

  return (
    <div>
        <PageNav />
    <div className='trip'>
      <h1>{currentcity.cityName} Travel Experience</h1>
      <Tripfetch />
    </div>

    </div>
  )
}
