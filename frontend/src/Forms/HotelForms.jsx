import React, { useEffect, useState } from 'react'
import "../styles/index.css"
import { motion } from 'framer-motion';
import { Plane, Users, Calendar, MapPin, Palmtree } from 'lucide-react';
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import PageNav from '../components/PageNav';
import { useCities } from '../contexts/CitiesContext';
import axios from 'axios';
export default function HotelForms() {
  const BASE_URL = "https://worldwise-backend-iota.vercel.app/api/auth";
  const {trip}=useAuth();
  const navigate=useNavigate();
  const {currentcity}=useCities();
  console.log("current city",currentcity)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formData,setFormData] =useState({
    destination:"",
    strength:"",
    tripType:"",
    date:`${startDate} - ${endDate}`
  });
  const {user}=useAuth();
  function handleChange(e){
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }
  async function handleSubmit(){
    const tripData={
      destination: formData.destination,
      strength: formData.strength,
      tripType: formData.tripType,
      startDate: startDate ? startDate.toISOString().split('T')[0] : null,
      endDate: endDate ? endDate.toISOString().split('T')[0] : null,
      userId: user.userId
    }
    try{
      const response =await axios.post(`${BASE_URL}/trips/tripregister`,tripData);
      const res=response.json();
      console.log("trip data returned:",res);
      navigate('/pricing');
    }
    catch(err){
      console.error("Error submitting form:", err);
    
  }
  }
  return (
    <>
    
    <motion.div 
    initial={{ opacity:0,x:700}}
    animate={{opacity:1,x:0}}
    transition={{duration:1}}
    className=" text-2xl min-h-screen min-w-full bg-gray-900 flex items-center justify-center  z-50 absolute top-0 overflow-hidden">
      <span className='fixed left-0 top-0'>
        <PageNav />
      </span>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-xl p-8"
      >
        <div className="flex items-center gap-3 mb-8 p-3">
          <Plane className="w-12 h-12 text-purple-500" />
          <h1 className="font-bold text-white text-5xl">Plan Your Trip</h1>
        </div>

        <form className="space-y-9 p-3" onSubmit={handleSubmit} >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2 "
          >
            <label className="block text-purple-400 text-sm font-medium ">
              <div className="flex items-center gap-2 mb-2 text-2xl">
                <MapPin className="w-6 h-6" />
                Destination
              </div>
              <input
                name='destination' 
                type="text"
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                placeholder="Where do you want to go?"
                onChange={handleChange}
                defaultValue={currentcity.cityName}
              />
            </label>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
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
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
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
                />
              </label>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-2"
          >
            <label className="block text-purple-400 text-sm font-medium">
              <div className="flex items-center gap-2 mb-2 text-2xl">
                <Users className="w-6 h-6" />
                Number of Travelers
              </div>
              <select name='strength' value={formData.strength} onChange={handleChange}  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white">
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5+ People</option>
              </select>
            </label>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-2"
          >
            <label className="block text-purple-400 text-sm font-medium">
              <div className="flex items-center gap-2 mb-2 text-2xl">
                <Palmtree className="w-6 h-6" />
                Trip Type
              </div>
              <div className="grid grid-cols-2 gap-4">
                {['Beach', 'Mountain', 'City', 'Adventure'].map((type) => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer" >
                    <input  type="radio" name="tripType" onChange={handleChange} className="form-radio text-purple-500 " />
                    <span className="text-white">{type}</span>
                  </label>
                ))}
              </div>
            </label>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Plan My Trip
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
    </>
  )  
}
