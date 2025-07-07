import React, {useState } from 'react';
import { useAuth } from '../contexts/useAuth';
import { Calendar, Car, Clock, Hotel, MapPin, Star, Users, Utensils, Wifi } from 'lucide-react';
import "./trips.css"

const hotelImages=[
  "https://th.bing.com/th/id/OIP.-y33HaHKGwFepW3WHTeg6AHaFj?w=221&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  "data:image/webp;base64,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",
  "data:image/webp;base64,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",
  "https://th.bing.com/th/id/OIP.5i93iy3rg3Z0d9z0NujgfQHaDt?w=349&h=174&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  "https://th.bing.com/th/id/OIP.xRvZfwIfGTVdDSSZSNqlwAHaE1?w=273&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
];
const itineraryImages = [
  "https://ts1.mm.bing.net/th?id=OIP.JbPcV41SHcQyMzPWVPXqjwHaE8&pid=15.1",
  "https://th.bing.com/th/id/OIP.gbFzD8Tw__W0wBZUVWak2gHaE8?w=260&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  "https://th.bing.com/th/id/OIP.yQV9YN97q7-pD-MDLHFaJAHaEK?w=238&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  "https://th.bing.com/th/id/OIP.tV1EQO77Vs-FENYccoksqQHaE8?w=216&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  "https://th.bing.com/th/id/OIP.YP-s0EIDK77tMeijKrBxAgHaE8?w=216&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
]
const mustVisitImages=[
  "https://th.bing.com/th/id/OIP.3LxH0yx0xm75mjuUWicfDAHaE8?w=273&h=182&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  "https://th.bing.com/th/id/OIP.YP-s0EIDK77tMeijKrBxAgHaE8?w=273&h=182&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  "https://th.bing.com/th/id/OIP.pXP5NEbASM00CfLN4fYRRQHaEv?w=253&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  "https://th.bing.com/th/id/OIP.pJpGZ_vSyFuC19HVLK3-LQAAAA?w=242&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  "https://th.bing.com/th/id/OIP.OIM6Xqt0CgoGKv5Z4W3_rQHaEg?w=298&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7"
]
export default function Tripdetails() {
  const { trips } = useAuth();
  const [activeFilter, setActiveFilter] = useState('hotels');
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
            <img src={hotel.image?hotel.image:hotelImages[index]} alt={hotel.name} 
            onError={(e) => {
                e.target.onerror = null; // prevent infinite loop
                 e.target.src = hotelImages[index]
  }}
            />
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
              <img src={activity.image?activity.image:itineraryImages[index]} alt={activity.name} className="event-img" 
              onError={(e) => {
                e.target.onerror = null; // prevent infinite loop
                 e.target.src = itineraryImages[index]
  }}/>
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
            <img src={place.image?place.image:mustVisitImages[index]} alt={place.name} 
            onError={(e) => {
                e.target.onerror = null; // prevent infinite loop
                 e.target.src = mustVisitImages[index]
  }}
            />
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
