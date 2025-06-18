import React from 'react';
import '../styles/SponsorCarousel.css';
import { Link } from 'react-router-dom';
import { FaChair } from 'react-icons/fa'; // Font Awesome Chair icon
import sponsor1 from '../assets/dummy-image.jpg';
import sponsor2 from '../assets/dummy-image-1.jpg';
import sponsor3 from '../assets/dummy-image-2.jpg';

const SponsorCarousel = () => {
  const logos = [sponsor1, sponsor2, sponsor3];

  return (
    <div className="sponsor-section">
      <div className="sponsor-wrapper">
        <div className="sponsor-left">
          <h2 className="sponsor-heading">Our Sponsors</h2>
          <Link to="/register" className="register-btn">
            <FaChair style={{ marginRight: '0.5rem' }} /> Become a Sponsor
          </Link>
        </div>
        <div className="sponsor-right">
          {logos.map((logo, index) => (
            <div className="logo-box" key={index}>
              <img src={logo} alt={`Sponsor ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorCarousel;
