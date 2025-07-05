import React, { useState, useEffect } from 'react';
import { MapPin, Plane } from 'lucide-react';

const TravelLoadingAnimation= ({ 
  onComplete, 
  duration = 12000 
}) => {
  const [textIndex, setTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const messages = [
    "Planning your perfect trip...",
    "Finding the best routes...",
    "Discovering amazing places...",
    "Almost ready!"
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % messages.length);
    }, duration / messages.length);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (duration / 50));
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          if (onComplete) onComplete();
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [duration, onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        
        {/* Main Animation */}
        <div className="relative mb-12">
          <div className="w-80 h-2 bg-slate-700 rounded-full mx-auto mb-8 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Plane moving along progress bar */}
              <div className="absolute -right-1 -top-3 transform">
                <Plane className="w-6 h-6 text-blue-400 rotate-45" />
              </div>
            </div>
          </div>

          {/* Destination markers */}
          <div className="flex justify-between items-center w-80 mx-auto">
            {[0, 25, 50, 75, 100].map((point, index) => (
              <div key={index} className="relative">
                <MapPin 
                  className={`w-6 h-6 transition-all duration-500 ${
                    progress >= point 
                      ? 'text-blue-400 scale-110' 
                      : 'text-slate-600 scale-100'
                  }`} 
                />
                {progress >= point && (
                  <div className="absolute -inset-2 bg-blue-400/20 rounded-full animate-ping"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-3xl font-bold text-white mb-6 transition-all duration-500">
          {messages[textIndex]}
        </h2>

        {/* Progress Percentage */}
        <div className="text-slate-400 text-lg mb-8">
          {Math.round(progress)}% Complete
        </div>

        {/* Animated Dots */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default TravelLoadingAnimation;