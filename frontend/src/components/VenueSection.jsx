// VenueSection.jsx
import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/VenueSection.css';

const VenueSection = () => {
  return (
    <section className="venue-section" id='contact'>
      <div className="venue-info">
        <h2><FaMapMarkerAlt /> VENUE</h2>
        <p className="venue-title">Marriott Louisville East</p>
        <p className="venue-address">
          Embassy Square BLVD, Louisville, KY 40299, USA
        </p>
      </div>

      <div className="venue-map">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3134.6417188038304!2d-85.57568549999999!3d38.21821399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8869a03be1437647%3A0xd4beecb64b500fdf!2sLouisville%20Marriott%20East!5e0!3m2!1sen!2sin!4v1750136519495!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default VenueSection;
