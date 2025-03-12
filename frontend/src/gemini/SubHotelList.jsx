import React from "react";
import { Star, MapPin, Wifi, Coffee, Car, School as Pool, Utensils, Building2, CookingPot, WashingMachine, TreePalm, Mountain, PawPrint } from "lucide-react";
import "./HotelList.css"; // Import the normal CSS file
const imageLink=[
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200",
  "../../public/hotel4.jpeg",
  "../../public/hotel5.jpg"
  
]


const AmenityIcon = ({ type }) => {
  switch (type) {
    case "Free Wifi":
      return <Wifi className="icon" />;
    case "Free Parking":
      return <Car className="icon" />;
    case "Restaurant":
      return <Coffee className="icon" />;
    case "Bar":
      return <Pool className="icon" />;
     case "Breakfast Included":
        return <Utensils className="icon" />;
        case "Balcony":
          return <Building2 className="icon" />;
          case "Kitchenette":
            return <CookingPot className="icon" />;
            case "Laundry Facilities":
              return <WashingMachine className="icon" />;
      case "Garden":
        return <TreePalm className="icon" />; 
      case "Hiking Trails":
          return <Mountain className="icon" />;      
          case "Pet-Friendly":
        return <PawPrint className="icon" />; 

    default:
      return null;
  }
};

function HotelList({hotels}) {
  function SubList({hotel}){
    const { id, name, address,rating, priceRange, amenities,distance } = hotel;

    return(
      <div 
      className="hotel-card"
    >
      <div className="hotel-image-container">
        <img 
          src={imageLink[hotel.id-1]} 
          alt={name}
          className="hotel-image"
        />
        <div className="hotel-rating">
          <span className="rating-content">
            <Star className="star-icon" />
            {rating}
          </span>
        </div>
      </div>

      <div className="hotel-details">
        <h2 className="hotel-name">{hotel.name}</h2>
        <p className="hotel-location">
          <MapPin className="map-icon" />
          {address}
        </p>
        <p className="hotel-description">{distance} from station of city</p>
        
        <div className="hotel-amenities">
          {amenities.map((amenity) => (
            <div 
              key={amenity}
              className="amenity-icon"
              title={amenity.charAt(0).toUpperCase() + amenity.slice(1)}
            >
              <AmenityIcon type={amenity} />
            </div>
          ))}
        </div>

        <div className="hotel-footer">
          <span className="hotel-price">{priceRange} $</span>
          <button className="book-button">
            Book Now
          </button>
        </div>
      </div>
    </div>
    )
  }
  return (
    <div className="hotels-container">
      <div className="hotels-wrapper">
        <h1 className="hotels-title">
          Discover Amazing Hotels
        </h1>
        
        <div className="hotels-grid">
          {hotels.map((hotel) => (
            <SubList hotel={hotel} key={hotel.id} />
          ))}
        </div>
      </div>
    </div>

  );
}

export default HotelList;
