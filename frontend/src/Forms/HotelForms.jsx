import React, { useEffect, useState } from "react";
import "../styles/index.css";
import { motion } from "framer-motion";
import { Plane, Users, Calendar, MapPin, Palmtree, Wallet } from "lucide-react";
import DatePicker from "react-datepicker";
import { useAuth } from "../contexts/useAuth";
import { useCities } from "../contexts/CitiesContext";
import TravelLoadingAnimation from "../Trip-Fetching-Firebase/TravelLoadingAnimation";

export default function HotelForms() {
  const { currentcity } = useCities();
  const { user, loading, setLoading, createTrip } = useAuth();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formData, setFormData] = useState({
    destination: "",
    strength: "",
    tripType: "",
    budget: "",
  });

  useEffect(() => {
    if (currentcity?.cityName) {
      setFormData((prev) => ({
        ...prev,
        destination: currentcity.cityName,
      }));
    }
  }, [currentcity]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const tripData = {
      cityName: formData.destination,
      strength: formData.strength,
      tripType: formData.tripType,
      startDate: startDate ? startDate.toISOString().split("T")[0] : null,
      endDate: endDate ? endDate.toISOString().split("T")[0] : null,
      budget: formData.budget,
      userId: user._id,
    };
    setLoading(true);
    console.log("Submitting trip data:", tripData);
    createTrip(tripData);
  }
  if(loading){
  return(
    <span style={{width:"100vw", height:"100vh"}} className=" absolute z-40 top-0 left-0 right-0 bottom-0">
      <TravelLoadingAnimation />
    </span>
  )
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: 700 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="fixed top-0 left-0 w-full h-full z-50 backdrop-blur-md bg-black/40 flex items-center justify-center px-4 overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-xl p-6 md:p-10 my-10"
      >
        <div className="flex items-center gap-3 mb-8">
          <Plane className="w-12 h-12 text-purple-500" />
          <h1 className="font-bold text-white text-4xl md:text-5xl">
            Plan Your Trip
          </h1>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Destination */}
          <div>
            <label className="block text-purple-400 text-sm font-medium">
              <div className="flex items-center gap-2 mb-2 text-2xl">
                <MapPin className="w-6 h-6" />
                Destination
              </div>
              <input
                id="destination"
                name="destination"
                type="text"
                value={formData.destination}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                placeholder="Where do you want to go?"
              />
            </label>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-purple-400 text-sm font-medium">
                <div className="flex items-center gap-2 mb-2 text-2xl">
                  <Calendar className="w-6 h-6" />
                  Start Date
                </div>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                  placeholderText="Select start date"
                />
              </label>
            </div>
            <div>
              <label className="block text-purple-400 text-sm font-medium">
                <div className="flex items-center gap-2 mb-2 text-2xl">
                  <Calendar className="w-6 h-6" />
                  End Date
                </div>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                  placeholderText="Select end date"
                  minDate={startDate}
                />
              </label>
            </div>
          </div>

          {/* Travelers */}
          <div>
            <label className="block text-purple-400 text-sm font-medium">
              <div className="flex items-center gap-2 mb-2 text-2xl">
                <Users className="w-6 h-6" />
                Number of Travelers
              </div>
              <select
                name="strength"
                value={formData.strength}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
              >
                <option value="">Select</option>
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5+ People</option>
              </select>
            </label>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-purple-400 text-sm font-medium">
              <div className="flex items-center gap-2 mb-2 text-2xl">
                <Wallet className="w-6 h-6" />
                Budget
              </div>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
              >
                <option value="">Select</option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>

          {/* Trip Type */}
          <div>
            <label className="block text-purple-400 text-sm font-medium">
              <div className="flex items-center gap-2 mb-2 text-2xl">
                <Palmtree className="w-6 h-6" />
                Trip Type
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {["Beach", "Mountain", "City", "Adventure"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 p-3 rounded-lg bg-[#1e1e2f] hover:bg-[#2a2a40] transition cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="tripType"
                      value={type}
                      checked={formData.tripType === type}
                      onChange={handleChange}
                      className="accent-purple-500"
                    />
                    <span className="text-white font-medium">{type}</span>
                  </label>
                ))}
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Plan My Trip"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
