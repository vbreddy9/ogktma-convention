import React, { useState } from 'react';
import '../styles/AgendaComponent.css';

const agenda = [
  {
    date: 'Friday, Sept 5',
    events: [
      { time: '7:00 – 10:00 PM', title: 'OGKTMA Got Talent & Miss & Mister OGKTMA Pageant' },
    ]
  },
  {
    date: 'Saturday, Sept 6',
    events: [
      { time: '7:00 AM – 9:00 AM', title: 'Registration & Breakfast' },
      { time: '7:00 AM – 3:00 PM', title: 'Exhibitions' },
      { time: '8:15 AM', title: 'CME: Introduction' },
      { time: '8:30 AM – 9:00 AM', title: 'Ethics – Dr. Ram Pasupuleti, International Pain Management Specialist, Bowling Green, KY' },
      { time: '9:00 AM – 9:30 AM', title: 'Joy of Medicine – Dr. Bruce Scott, Past President of AMA' },
      { time: '9:30 AM – 10:00 AM', title: 'Perils in Social Media and Loneliness – Dr. El-Mallakh, Psychiatrist, Louisville' },
      { time: '10:00 AM – 10:30 AM', title: 'Break' },
      { time: '10:30 AM – 11:00 AM', title: 'Maladies of Aging – Dr. Naresh Solanki, Director of Cath Lab, University Jewish Hospital' },
      { time: '11:00 AM – 11:30 AM', title: 'Can We Beat Cancer – Dr. Dev Karan, Ph.D., Faculty of Urology, U of L' },
      { time: '11:30 AM – 12:00 PM', title: 'Q & A' },
      { time: '12:00 PM – 1:00 PM', title: 'Lunch / Sponsor Talk' },
      { time: '1:00 PM – 2:00 PM', title: 'Jeopardy (OMC/GMC/KMC/Other Telangana Medical Schools)' },
      { time: '2:00 PM – 3:30 PM', title: 'General Body Meeting' },
      { time: '3:30 PM – 4:30 PM', title: 'Breakout Sessions' },
      { time: '6:00 PM', title: 'Cocktails' },
      { time: '6:00 PM – Midnight', title: 'Gala' },
      { time: 'Midnight – 2:00 AM', title: 'Mehfil' },
    ]
  },
  {
    date: 'Sunday, Sept 7',
    events: [
      { time: '8:00 – 11:00 AM', title: 'Brunch' },
    ]
  },
];

const AgendaComponent = () => {
  const [activeTab, setActiveTab] = useState(agenda[0].date);

  return (
    <>
      {/* Agenda Section */}
      <section className="agenda-section">
        <h2 className="agenda-title">EVENT AGENDA</h2>

        <div className="agenda-tabs">
          {agenda.map((day, idx) => (
            <button
              key={idx}
              className={`agenda-tab-button ${activeTab === day.date ? 'active' : ''}`}
              onClick={() => setActiveTab(day.date)}
            >
              {day.date}
            </button>
          ))}
        </div>

        {agenda.map((day, i) => (
          <div
            className={`agenda-day ${activeTab === day.date ? 'active' : ''}`}
            key={i}
          >
            <ul className="agenda-events">
              {day.events.map((event, j) => (
                <li className="agenda-event" key={j}>
                  <div className="agenda-time">{event.time}</div>
                  <div className="agenda-text">{event.title}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Sponsorship Section */}
      <div className="sponsorship-container">
        <h2 className="sponsorship-title">🩺 OGKTMA Annual Convention 2025 – Sponsorship Opportunities</h2>

        <p className="sponsorship-desc">
          📍 <strong>One of the Largest Indian Medical Alumni Organizations in the U.S.</strong><br />
          📅 Convention Date: <strong>Sept 5th–7th, 2025</strong> | 🔑 Expected Attendees: <strong>350+ Physicians</strong><br />
          🌐 Alumni Reach: <strong>4,000+ Nationwide</strong>
        </p>

        <div className="sponsorship-table-header">
          <div>🏆 Level</div>
          <div>💵 Cost</div>
          <div>🎁 Benefits</div>
        </div>

        <div className="sponsorship-row">
          <div><strong style={{ color: '#ffeb3b' }}>Platinum</strong></div>
          <div>$20,000</div>
          <div>Back Cover Ad • Gala Recognition • Exhibit Booth • Stage Presentation</div>
        </div>

        <div className="sponsorship-row">
          <div><strong style={{ color: '#b2ff59' }}>Diamond</strong></div>
          <div>$10,000</div>
          <div>Inside Cover Ad • Gala Recognition • Exhibit Booth</div>
        </div>

        <div className="sponsorship-row">
          <div><strong style={{ color: '#ffb300' }}>Gold</strong></div>
          <div>$5,000</div>
          <div>Full Page Ad • Exhibit Booth • Recognition</div>
        </div>

        <div className="sponsorship-row">
          <div><strong style={{ color: '#b0bec5' }}>Silver</strong></div>
          <div>$2,500</div>
          <div>Exhibit Booth Only</div>
        </div>

        <div className="sponsorship-contact">
          <p className="contact-heading">Ready to Sponsor?</p>
          <p className="contact-text">
            Questions? Contact us at <a href="mailto:ssandella@yahoo.com">ssandella@yahoo.com</a> or{' '}
            <a href="tel:5023338929">502-333-8929</a>
          </p>
          <p className="contact-text">
            Please mail checks to:<br />
            <strong>Surender Sandella</strong><br />
            2100 Cave Spring Place,<br />
            Louisville, Kentucky, 40223
          </p>
        </div>
      </div>
    </>
  );
};

export default AgendaComponent;
