import React from 'react';
import '../styles/EarlyBirdPackages.css';
import { Link } from 'react-router-dom';
import { FaChair } from 'react-icons/fa';

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
  },
  {
    title: 'SINGLE REGISTRATION',
    price: '$300',
    subtitle: 'Ideal for one individual',
    features: [
      'Registration for 1 Person',
      'Hotel not included – book your own through Marriott',
      'CME on Saturday',
      'Friday dinner, Saturday breakfast, lunch, dinner, and Sunday brunch',
      'Friday night cultural program –OGKTMA Got Talent',
      'Saturday night Gala Cultural Program',
      'Entry to Expo/Booths'
    ]
  },
  {
    title: 'COUPLE REGISTRATION',
    price: '$500',
    features: [
      'Registration for couple',
      'Hotel not included – book your own through Marriott',
      'CME on Saturday',
      'Friday dinner, Saturday breakfast, lunch, dinner, and Sunday brunch',
      'Friday night cultural program –OGKTMA Got Talent',
      'Saturday night Gala Cultural Program',
      'Entry to Expo/Booths'
    ]
  },
  {
    title: 'NEXT GEN/YPS/MRSF',
    price: '$200',
    subtitle: 'For OGKTMA alumni kids (21+)',
    features: [
      'Does not include hotel – please book through Marriott Website',
      'Includes CME',
      'Includes Saturday Riverboat Cruise (1–4 PM) on Ohio River',
      'Includes Saturday Night DJ, Cocktails & Dinner',
      'Friday dinner, Saturday breakfast, lunch, dinner, and Sunday brunch',
      'Over 21 years kids of OGKTMA alumni',
      'Entry to Expo/Booths'
    ]
  },
  {
    title: 'STUDENT/TRAINEE',
    price: '$200',
    subtitle: 'Member of OGKTMA alumni',
    features: [
      'Registration for 1 Person',
      'Hotel not included – book your own through Marriott',
      'CME on Saturday',
      'Friday dinner, Saturday breakfast, lunch, dinner, and Sunday brunch',
      'Friday night cultural program –OGKTMA Got Talent',
      'Saturday night Gala Cultural Program',
      'Entry to Expo/Booths'
    ]
  }
];

const EarlyBirdPackages = () => {
  return (
    <section className="early-bird-section" id="packages">
      <div className="note-container">
        <p className="note-message">
          <strong>Note:</strong> Not purchasing a package? <strong>Book your hotel at discounted rates using the link.</strong> –&nbsp;
          <a
            href="https://book.passkey.com/go/OGKTMA"
            target="_blank"
            rel="noopener noreferrer"
            className="hotel-link"
          >
            <strong>BOOK YOUR HOTEL</strong>
          </a>
        </p>
      </div>
      <h2 className="heading">
        Super Early Bird Packages for OGKTMA <br /> CONVENTION & SCIENTIFIC ASSEMBLY
      </h2>
      <div className="packages-grid">
        {packages.map((pkg, index) => (
          <div className="package-card" key={index}>
            <h3 className="package-title">{pkg.title}</h3>
            {pkg.subtitle && <p className="package-subtitle">{pkg.subtitle}</p>}
            <p className="package-price">{pkg.price}</p>
            <ul className="features">
              {pkg.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <Link
              to="/register"
              state={{ selectedMembership: `${pkg.title.toUpperCase()} (${pkg.price})` }}
              className="register-btn"
            >
              <FaChair style={{ marginRight: '0.5rem' }} /> Register Now
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EarlyBirdPackages;
