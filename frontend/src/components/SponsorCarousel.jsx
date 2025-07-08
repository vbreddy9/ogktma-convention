import React from 'react';
import '../styles/SponsorCarousel.css';
import { Link } from 'react-router-dom';
import { FaChair } from 'react-icons/fa'; // Font Awesome Chair icon
import sponsor1 from '../assets/modi-financial-group.webp';
import sponsor2 from '../assets/navaami.webp';
import sponsor3 from '../assets/phathom.webp';
import sponsor4 from '../assets/cpa.webp';
import sponsor5 from '../assets/dummy.png';

const SponsorCarousel = () => {
  const logos = [sponsor5, sponsor5, sponsor5, sponsor5];

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
