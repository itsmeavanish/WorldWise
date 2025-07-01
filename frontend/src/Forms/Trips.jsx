import React, { useState } from 'react'
import PageNav from '../components/PageNav'
import {motion }from "framer-motion"
import { useAuth } from '../contexts/useAuth'
import { ArrowRight, Calendar, MapPin, Plane, Users } from 'lucide-react'
const destinations = [
  {
    id: 1,
    title: "Bali Paradise",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800",
    price: "$1,299",
    duration: "8 days",
    people: "2-4"
  },
  {
    id: 2,
    title: "Swiss Alps",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=800",
    price: "$1,899",
    duration: "7 days",
    people: "2-6"
  },
  {
    id: 3,
    title: "Santorini Escape",
    image: "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=800",
    price: "$1,599",
    duration: "6 days",
    people: "2-3"
  }
];

export default function Trips() {
  const {trips}=useAuth();
  return (
    
    <>
      
      <PageNav  />
      <div className="min-h-screen bg-gray-900 text-white p-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className=" p-32 "
      >
        <div className="flex items-center gap-3 mb-12">
          <Plane className="w-12 h-12 text-purple-500" />
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Your Trips
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-xle text-xl "
            >
              <div className="relative h-72 ">
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full">
                  {destination.price}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-3xl font-semibold mb-4">{destination.title}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-7 h-7 text-purple-500" />
                    <span>Popular Destination</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="w-7 h-7 text-purple-500" />
                    <span>{destination.duration}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-300">
                    <Users className="w-7 h-7 text-purple-500" />
                    <span>{destination.people} people</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 text-2xl w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-semibold"
                >
                  Book Now
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
    </>
  )
}
