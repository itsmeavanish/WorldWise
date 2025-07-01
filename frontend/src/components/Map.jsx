import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";

import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button.jsx";
import useUrlPosition from "../hooks/useUrlPosition.js";
import { useCities } from "../contexts/CitiesContext.jsx";
import { Search } from "lucide-react";

export default function Map() {
  const { cities } = useCities();
  const [mapposition, setmapposition] = useState([40, 0]);
  const { position: geolocationPosition, getPosition, isLoading: isLoadingPosition } = useGeolocation();
  const [lat, lng] = useUrlPosition();
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [searchMarker, setSearchMarker] = useState(null); // Marker for search location

  useEffect(() => {
    if (lat && lng) setmapposition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geolocationPosition) {
      setmapposition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);

  // Function to handle location search
  const searchLocation = async () => {
    if (!searchQuery) return alert("Enter a location to search!");

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery
        )}&format=json&limit=1`
      );
      const data = await response.json();

      if (data.length === 0) {
        alert("Location not found!");
        return;
      }

      const { lat, lon } = data[0];
      const newMarkerPosition = [parseFloat(lat), parseFloat(lon)];
      setSearchMarker(newMarkerPosition);
      setmapposition(newMarkerPosition);
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Failed to fetch location!");
    }
  };
const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchLocation();
    }
  };
  return (
    <>
      <div className="flex items-center justify-center h-fit w-fit absolute  z-50 gap-1 " style={{left:"40%", top:"7%"}}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a location"
            onKeyDown={handleKeyDown}
            className="pr-28 py-2"
          />
          <button onClick={searchLocation} className=" -ml-16 p-2  text-white rounded hover:text-blue-600">
            <Search size={12}/>
          </button>
        </div>
         

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
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />

          {cities.map((city) => (
            <Marker
              position={[city?.position?.lat, city?.position?.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city?.emoji}</span>
                <span>{city?.cityName}</span>
              </Popup>
            </Marker>
          ))}

          {geolocationPosition && (
            <Marker
              position={[
                geolocationPosition?.lat,
                geolocationPosition?.lng,
              ]}
            ></Marker>
          )}

          {searchMarker && (
            <Marker position={searchMarker}>
              <Popup>Searched Location</Popup>
            </Marker>
          )}

          <Changecenter position={mapposition} />
          <DetectClick />
        </MapContainer>
      </div>
    </>
  );
}

function Changecenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
