import React, { useEffect, useState } from 'react';
import styles from './Map.module.css';
import {  useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer,TileLayer,Marker,Popup, useMap,useMapEvent } from 'react-leaflet';

import {useGeolocation} from '../hooks/useGeolocation';
import Button from "./Button.jsx";
import useUrlPosition from '../hooks/useUrlPosition.js';
import User from './User.jsx';
import { useCities } from '../contexts/CitiesContext.jsx';
export default function Map() {
const [input,setinput]=useState(true);
  const {cities,isLoading}=useCities();
  const [mapposition,setmapposition]=useState([40,0]);
  const [searchParams] = useSearchParams();
  
  const {isLoading:isLoadingPosition,
    position:geolocationPosition,
    getPosition,
  }=useGeolocation()
  const [lat,lng]=useUrlPosition();
  
  
  useEffect(function(){ 
    if (lat && lng )setmapposition([lat,lng]);
  },[lat,lng]);
  useEffect(
    function () {
      if (geolocationPosition) {
        console.log('Updating map position:', geolocationPosition); // Debug line
        setmapposition([geolocationPosition.lat, geolocationPosition.lng]);
      }
    },
    [geolocationPosition]
  );
  
  return (
    <>
    
    <div className={styles.mapContainer}>
    
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer 
      center={mapposition} 
      zoom={6} 
      scrollWheelZoom={true}
      className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {cities?.map((city)=>(<Marker position={[city?.position?.lat,city?.position?.lng]}key={city.id} >
      <Popup>
        <span>{city?.emoji}</span><span>{city?.cityName}</span>
      </Popup>
    </Marker>))}
    {geolocationPosition && (
          <Marker
            position={[geolocationPosition?.lat, geolocationPosition?.lng]}
          ></Marker>)}
    <Changecenter position={mapposition} />
    <DetectClick />
  </MapContainer>
    </div>
    </>
  );
}
function Changecenter({position}){
  const map=useMap();
  map.setView(position);
  return null;
}

export function DetectClick(){
const [input,setinput]=useState(true)
  const navigate=useNavigate();
  useMapEvent(
    {
      click:(e)=>{
        console.log(e);
        setinput(!input)
        navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        return input
      }
    }
  );
}
