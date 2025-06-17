import React from 'react';
import '../styles/SponsorCarousel.css';
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
          <a href="#become-sponsor" className="sponsor-btn">
            Become a Sponsor <span className="icon">👜</span>
          </a>
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
