import React from 'react'
import styles from './CountryList.module.css'
import CountryItem from './CountryItem'
import Spinner from './Spinner'
import Message from "./Message"
import { useCities } from '../contexts/CitiesContext'

export default function Country() {
  const {cities,loading}=useCities();
  if (loading===true){
    <Spinner />
  }
  if (cities.length===0){
    <Message message="Add your City By clicking on the map" />
  }
  const countries=cities.reduce((arr,city)=>
  {
    if (!(arr.map((el)=>el.country).includes(city.country))) return [...arr,{country:city.country,emoji:city.emoji}];
    else return arr;
  }
  ,[]);
  return(
    <ul className={styles.countryList }>
        {countries.map((country)=><CountryItem country={country}/>)}
    </ul>
  )
}
