import React from 'react';
import '../styles/SponsorshipSection.css';

const SponsorshipSection = () => {
  return (
    <div className="sponsorship-wrapper">
      <h2 className="sponsorship-heading">🩺 OGKTMA Annual Convention 2025 – Sponsorship Opportunities</h2>

      <p className="sponsorship-description">
        📍 <strong>One of the Largest Indian Medical Alumni Organizations in the U.S.</strong><br />
        📅 Convention Date: <strong>Sept 5th–7th, 2025</strong> | 🔑 Expected Attendees: <strong>350+ Physicians</strong><br />
        🌐 Alumni Reach: <strong>4,000+ Nationwide</strong>
      </p>

      <div className="sponsorship-table">
        <div className="table-header">
          <div>🏆 Level</div>
          <div>💵 Cost</div>
          <div>🎁 Benefits</div>
        </div>

        <div className="table-row">
          <div className="level platinum">Platinum</div>
          <div>$20,000</div>
          <div>Back Cover Ad • Gala Recognition • Exhibit Booth • Stage Presentation</div>
        </div>

        <div className="table-row">
          <div className="level diamond">Diamond</div>
          <div>$10,000</div>
          <div>Inside Cover Ad • Gala Recognition • Exhibit Booth</div>
        </div>

        <div className="table-row">
          <div className="level gold">Gold</div>
          <div>$5,000</div>
          <div>Full Page Ad • Exhibit Booth • Recognition</div>
        </div>

        <div className="table-row">
          <div className="level silver">Silver</div>
          <div>$2,500</div>
          <div>Exhibit Booth Only</div>
        </div>
      </div>

      <div className="contact-box">
        <p className="contact-heading">Ready to Sponsor?</p>
        <p>Questions? Contact us at <a href="mailto:ssandella@yahoo.com">ssandella@yahoo.com</a> or <a href="tel:5023338929">502-333-8929</a></p>
        <p style={{ marginTop: '15px' }}>
          <strong>Please mail checks to:</strong> Surender Sandella<br />
          2100 Cave Spring Place, Louisville, Kentucky, 40223
        </p>
      </div>
    </div>
  );
};

export default SponsorshipSection;
