import React, { useEffect, useState } from 'react';
import '../styles/CountdownSection.css';
import { Link } from 'react-router-dom';
import { FaChair } from 'react-icons/fa'; // Font Awesome Chair icon
import { FaClock } from 'react-icons/fa'; // Font Awesome Clock icon


const CountdownSection = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-09-05T00:00:00");
    const difference = targetDate - new Date();

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="countdown-section" >
      <div className="countdown-overlay">
        <FaClock className="clock-icon" />
        <h2 className="countdown-title">Hurry Up!</h2>
        <p className="countdown-subtitle">The clock is ticking and the seats are limited</p>

        <div className="countdown-timer">
          <div className="time-box">
            <span>{timeLeft.days || '00'}</span>
            <small>DAYS</small>
          </div>
          <div className="separator">:</div>
          <div className="time-box">
            <span>{timeLeft.hours || '00'}</span>
            <small>HOURS</small>
          </div>
          <div className="separator">:</div>
          <div className="time-box">
            <span>{timeLeft.minutes || '00'}</span>
            <small>MINUTES</small>
          </div>
          <div className="separator">:</div>
          <div className="time-box">
            <span>{timeLeft.seconds || '00'}</span>
            <small>SECONDS</small>
          </div>
        </div>
        <Link to="/register" className="register-btn">
            <FaChair style={{ marginRight: '0.5rem' }} /> Register Now
          </Link>
        
      </div>
    </section>
  );
};

export default CountdownSection;
