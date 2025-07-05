import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/useAuth';
import { useCities } from '../contexts/CitiesContext';
import { toast } from 'react-toastify';
import { Calendar, Car, Clock, Hotel, MapPin, Star, Users, Utensils, Wifi } from 'lucide-react';
import "./trips.css"
export default function Tripdetails() {
  const { user,setTrips,trips } = useAuth();
  const { currentcity } = useCities();
  const [activeFilter, setActiveFilter] = useState('hotels');

  const API = "https://worldwise-backend-iota.vercel.app/api/auth/";
  async function fetchTrips() {
    try {
      if(trips?.metadata?.city!==currentcity.cityName){
      const response = await axios.get(`${API}tripplan/firebase?userId=${user._id}&city=${currentcity.cityName}`);
      console.log("Fetched trip data:", response.data);
      setTrips(response.data)}

    } catch (error) {
      toast.error("Error fetching trip data: " + error.message);
      console.error("Error fetching trip data:", error);
    }
  }

  useEffect(() => {
    if (user._id) {
      fetchTrips();
      console.log("for the user",trips);
    }
  }, [user._id]);

  const renderStars = (rating) => {
    const starCount = parseFloat(rating);
    return (
      <div className="stars">
        {[...Array(Math.floor(starCount))].map((_, i) => (
          <Star key={i} className="star-icon filled" />
        ))}
        {starCount % 1 !== 0 && <Star className="star-icon half" />}
      </div>
    );
  };

  if (!trips) {
    return <div className="loading">Loading trip data...</div>;
  }

  const renderHotels = () => (
    <div className="content-grid">
      {trips.trip?.hotels.map((hotel, index) => (
        <div key={index} className="hotel-card">
          <div className="hotel-image">
            <img src={hotel.image} alt={hotel.name} />
            <div className="rating-badge">
              {renderStars(hotel.rating)}
              <span className="rating-text">{hotel.rating}</span>
            </div>
          </div>
          <div className="hotel-content">
            <h3 className="hotel-name">{hotel.name}</h3>
            <div className="hotel-location">
              <MapPin className="location-icon" />
              <span>{hotel.location}</span>
            </div>
            <p className="hotel-description">{hotel.description}</p>
            <div className="amenities">
              <h4>Amenities</h4>
              <div className="amenities-list">
                <div className="amenity-item">
                  <Utensils className="amenity-icon" />
                  <span>Fine Dining</span>
                </div>
                <div className="amenity-item">
                  <Wifi className="amenity-icon" />
                  <span>Free WiFi</span>
                </div>
                <div className="amenity-item">
                  <Car className="amenity-icon" />
                  <span>Valet Parking</span>
                </div>
                <div className="amenity-item">
                  <Users className="amenity-icon" />
                  <span>Concierge</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

const renderItinerary = () => (
  <div className="content-grid">
    {trips.trip?.itinerary.map((day, index) => (
      <div key={index} className="itinerary-card">
        <div className="day-header">
          <Calendar className="day-icon" />
          <h3>Day {day.day}: {day.theme}</h3>
        </div>
        <div className="best-times">
          <strong>Best Visit Times:</strong>
          <ul>
            <li><Clock /> Morning: {day.bestVisitTimes.morning}</li>
            <li><Clock /> Afternoon: {day.bestVisitTimes.afternoon}</li>
            <li><Clock /> Evening: {day.bestVisitTimes.evening}</li>
          </ul>
        </div>
        <div className="events-list">
          {day.activities.map((activity, i) => (
            <div key={i} className="event-item">
              <img src={activity.image} alt={activity.name} className="event-img" />
              <div className="event-content">
                <h4>{activity.name}</h4>
                <p>{activity.description}</p>
                <p><strong>Travel Tips:</strong> {activity.travelTips}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

  const renderMustVisit = () => (
    <div className="content-grid">
      {trips.trip.mustVisit.map((place, index) => (
        <div key={index} className="must-visit-card">
          <div className="place-image">
            <img src={place.image} alt={place.name} />
          </div>
          <div className="place-content">
            <h3>{place.name}</h3>
            <p className="place-reason">{place.reason}</p>
            <div className="visit-badge">
              <MapPin className="badge-icon" />
              <span>Must Visit</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

 const renderRecommendations = () => {
  const { recommendations } = trips.trip;
  return (
    <div className="recommendations-container">
      <div className="recommendation-section">
        <h3>Trip Highlights</h3>
        <div className="recommendation-list">
          {recommendations?.tripTypeHighlights.map((highlight, index) => (
            <div key={index} className="recommendation-item">
              <Star className="rec-icon" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendation-section">
        <h3>Food Highlights</h3>
        <div className="recommendation-list">
          {recommendations.food.highlights.map((dish, index) => (
            <div key={index} className="recommendation-item">
              <Utensils className="rec-icon" />
              <span>{dish}</span>
            </div>
          ))}
        </div>
        <h4>Luxury Dining Spots</h4>
        <ul>
          {recommendations.food.luxuryDiningSpots.map((spot, i) => (
            <li key={i}>{spot}</li>
          ))}
        </ul>
      </div>

      <div className="recommendation-section">
        <h3>Cultural Tips</h3>
        <div className="recommendation-list">
          {recommendations.culturalTips.map((tip, index) => (
            <div key={index} className="recommendation-item">
              <Users className="rec-icon" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendation-section">
        <h3>Cultural Events</h3>
        <ul>
          {recommendations.events?.culturalEvents?.map((event, index) => (
            <li key={index}>
              <strong>{event.name}:</strong> {event.description} {event.date && `(${event.date})`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

  const renderContent = () => {
    switch (activeFilter) {
      case 'hotels':
        return renderHotels();
      case 'itinerary':
        return renderItinerary();
      case 'mustVisit':
        return renderMustVisit();
      case 'recommendations':
        return renderRecommendations();
      default:
        return renderHotels();
    }
  };

  return (
    <div>
      <div className="filter-container">
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${activeFilter === 'hotels' ? 'active' : ''}`}
            onClick={() => setActiveFilter('hotels')}
          >
            <Hotel className="btn-icon" />
            Hotels
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'itinerary' ? 'active' : ''}`}
            onClick={() => setActiveFilter('itinerary')}
          >
            <Calendar className="btn-icon" />
            Full Plan
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'mustVisit' ? 'active' : ''}`}
            onClick={() => setActiveFilter('mustVisit')}
          >
            <MapPin className="btn-icon" />
            Must Visit
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'recommendations' ? 'active' : ''}`}
            onClick={() => setActiveFilter('recommendations')}
          >
            <Star className="btn-icon" />
            Recommendations
          </button>
        </div>
      </div>
      <div className="content-container">
        {renderContent()}
      </div>
    </div>
  );
}
