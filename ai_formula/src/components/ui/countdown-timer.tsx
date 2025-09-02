/**
 * Countdown Timer Component
 * @fileoverview Creates urgency with a countdown timer for discount offers
 * @author AI Formula Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to 7 days from now (or you can set a specific date)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        // Reset to 7 days when timer expires
        targetDate.setDate(targetDate.getDate() + 7);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const numberSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Clock className="w-4 h-4 text-red-500" />
      <div className={`text-red-500 font-semibold ${sizeClasses[size]}`}>
        優惠倒數:
      </div>
      <div className="flex items-center gap-1">
        {timeLeft.days > 0 && (
          <>
            <div className={`bg-red-500 text-white px-1.5 py-0.5 rounded font-bold ${numberSizeClasses[size]}`}>
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <span className={`text-red-500 ${sizeClasses[size]}`}>天</span>
          </>
        )}
        <div className={`bg-red-500 text-white px-1.5 py-0.5 rounded font-bold ${numberSizeClasses[size]}`}>
          {timeLeft.hours.toString().padStart(2, '0')}
        </div>
        <span className={`text-red-500 ${sizeClasses[size]}`}>:</span>
        <div className={`bg-red-500 text-white px-1.5 py-0.5 rounded font-bold ${numberSizeClasses[size]}`}>
          {timeLeft.minutes.toString().padStart(2, '0')}
        </div>
        <span className={`text-red-500 ${sizeClasses[size]}`}>:</span>
        <div className={`bg-red-500 text-white px-1.5 py-0.5 rounded font-bold ${numberSizeClasses[size]}`}>
          {timeLeft.seconds.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer; 