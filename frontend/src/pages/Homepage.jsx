import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe2, MapPin, Compass, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { useAuth } from '../contexts/useAuth';
import PageNav from '../components/PageNav';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
 

  return (
    <div className="app">
      <PageNav />
      <div  className="hero">
        <div className="hero-content">
          {/* Use motion.div instead of motion.h1 to wrap multiple headings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 style={{ fontSize: '4rem', fontWeight: '700', letterSpacing: '1px' }}>
              You Travel the World.
            </h1>
            <h1 style={{ fontSize: '4rem', fontWeight: '700', letterSpacing: '1px' }}>
              WorldWise Keeps Track of Your Journey.
            </h1>
          </motion.div>

          {/* Use motion.div instead of motion.p */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p style={{ padding: '1.3rem', fontSize: '1.6rem' }}>
              A world map that tracks your footsteps into every city you can think of. Never forget
              your wonderful experiences, and show your friends how you have wandered the world.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cta-button hero-cta"
            onClick={() => navigate(isAuthenticated ? '/Applayout' : '/login')}
          >
            Plan Your Adventure
          </motion.button>
        </div>
      </div>

      
    </div>
  );
}

export default HomePage;
