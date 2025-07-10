import { MapPin, Star } from "lucide-react";
import styles from "../pages/Trips.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";

export default function SubTrips({ savedTrip }) {
  const { destination, strength, startDate, endDate, budget, tripType,imageUrl } = savedTrip;
  const navigate=useNavigate();

  function handlegotoTrip() {
    navigate(`/tripplan?cityName=${destination}`);
  }
  return (
    <div className={styles.card}>
      <div className={styles.imagecontainer}>
        <img 
          src={imageUrl ? imageUrl :"https://www.solitarytraveller.com/wp-content/uploads/2020/11/solo_travelling_banner.jpg"} // fallback image based on destination
          alt={destination}
          className={styles.image}
        />
        <div className={styles.rating}>
          <span className={styles.ratingcontent}>
            <Star className={styles.staricon} />
            {tripType || "Custom"} Trip
          </span>
        </div>
      </div>

      <div className={styles.details}>
        <h2 className={styles.name}>Your Trip to {destination}</h2>

        <p className={styles.location}>
          <MapPin className={styles.mapicon} />
          Group Size: {strength}
        </p>

        <p className={styles.description}>
          {startDate} - {endDate}
        </p>

        <div className={styles.footer}>
          <span className={styles.budget}>Est. Budget: ₹{budget}</span>
          <button className={styles.button} onClick={handlegotoTrip}>Open Your Trip</button>
        </div>
      </div>
    </div>
  );
}
