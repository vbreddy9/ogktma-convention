import React from 'react';
import '../styles/Hero.css';

import { FaChair } from 'react-icons/fa'; // Font Awesome Chair icon
import heroVideo from '../assets/video-1.mp4' // Replace with your actual path

const HeroSection = () => {
  return (
    <section className="hero-section">
      <video className="hero-bg" autoPlay muted loop playsInline>
        <source src={heroVideo} type="video/mp4" />
         </video>

       <div className="hero-overlay">
        <div className="hero-content">
          <h1>38TH ANNUAL</h1>
          <h2>OGKTMA CONVENTION &<br />SCIENTIFIC ASSEMBLY</h2>
          <h3>Welcome to OGKTMA</h3>
          <p className="venue">
            Marriott Louisville East at 1903 <br />
            Embassy Square BLVD, Louisville, KY 40299
          </p>
          <div className="date">📅 SEP 5th – 7th, 2025</div>
          <a href="#packages" className="btn register-btn">
          <FaChair style={{ marginRight: '0.5rem' }} /> Register Now
        </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
