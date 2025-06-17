// EarlyBirdPackages.jsx
import React from 'react';
import '../styles/EarlyBirdPackages.css';
import { Link } from 'react-router-dom';
import { FaChair } from 'react-icons/fa'; // Font Awesome Chair icon

const packages = [
  {
    title: 'VIP EXCLUSIVE',
    price: '$5,000',
    features: [
      'Registration for 4 Person ',
      '2-night stay for two at Marriott (1 room on double occupancy)',
      'Full-page ad',
      'Donor Reconginsation',
      'Priority Seating',
      'CME Friday Dinner',
      'Saturday breakfast, lunch, and dinner',
      'Sunday brunch',
      'Access to the Expo Hall',
      'Cultural Programs'
    ]
  },
  {
    title: 'VIP SPONSOR',
    price: '$3,000',
    features: [
      'Registration for 2 Person ',
      '2-night stay for two at Marriott (1 room on double occupancy)',
      'Full-page ad',
      'Donor Reconginsation',
      'Priority Seating',
      'CME Friday Dinner',
      'Saturday breakfast, lunch, and dinner',
      'Sunday brunch',
      'Access to the Expo Hall',
      'Cultural Programs'
    ]
  },
  {
    title: 'PREMIUM DOUBLE',
    price: '$1,500',
    features: [
      'Registration for 2 Person ',
      '2-night stay for two at Marriott (1 room on double occupancy)',
      'Half-page ad',
      'CME Friday Dinner',
      'Saturday breakfast, lunch, and dinner',
      'Sunday brunch',
      'Access to the Expo Hall',
      'Cultural Programs'
    ]
  },
  {
    title: 'PREMIUM SINGLE',
    price: '$1,000',
    features: [
      'Registration for 1 Person',
      '2-night stay (1 room)',
      'Half-page ad',
      'CME Friday Dinner',
      'Saturday breakfast, lunch, and dinner',
      'Sunday brunch',
      'Access to the Expo Hall',
      'Cultural Programs'
      
    ]
  }
];

const EarlyBirdPackages = () => {
  return (
    <section className="early-bird-section" id='packages'>
      <h2 className="heading">Super Early Bird Packages for OGKTMA <br /> CONVENTION & SCIENTIFIC ASSEMBLY</h2>
      <div className="packages-grid">
        {packages.map((pkg, index) => (
          <div className="package-card" key={index}>
            <h3 className="package-title">{pkg.title}</h3>
            <p className="package-price">{pkg.price}</p>
            <ul className="features">
              {pkg.features.map((feature, i) => (
                <li key={i}> {feature}</li>
              ))}
            </ul>
            <Link to="/register" className="register-btn">
            <FaChair style={{ marginRight: '0.5rem' }} /> Register Now
          </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EarlyBirdPackages;