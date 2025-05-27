import { Brain, Compass, MapPin } from 'lucide-react'
import React from 'react'
import './Features.css'
import PageNav from '../components/PageNav'
export default function Features() {
   
  return (
    <div className='flex flex-col justify-between '>
        <PageNav />
        <div className='h-32'></div>
    <div  className="features">
        <div className="features-container">
          <div className="feature-card">
            <Brain className="feature-icon" />
            <h3>AI-Powered Planning</h3>
            <p>
              Our advanced AI understands your preferences and creates the perfect itinerary for
              your journey.
            </p>
          </div>
          <div className="feature-card">
            <MapPin className="feature-icon" />
            <h3>Custom Destinations</h3>
            <p>
              Discover hidden gems and popular attractions tailored to your interests and travel
              style.
            </p>
          </div>
          <div className="feature-card">
            <Compass className="feature-icon" />
            <h3>Smart Navigation</h3>
            <p>
              Get intelligent routing and transportation suggestions for seamless travel
              experiences.
            </p>
          </div>
        </div>
      </div>
      </div>
  )
}
