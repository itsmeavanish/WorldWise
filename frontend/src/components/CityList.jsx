import React, { useEffect, useState } from 'react'
import styles from './CityList.module.css'
import CityItem from './CityItem'
import Spinner from './Spinner'
import Message from "./Message"
import { useCities } from '../contexts/CitiesContext'
export default function CityList() {
  
  const {cities,fetchCities}=useCities();
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    setLoading(true);
    fetchCities();
    setLoading(false);
  },[])
  if (loading){
    return <Spinner />
  }
    
  if (! cities?.length){
    return <Message message="Add your City By clicking on the map" />
  }
  return(

    <ul className={styles.cityList }>
        {loading ? <Spinner />:cities?.map((city)=><CityItem city={city}/>)}
    </ul>
  )
}
