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
      { time: '7:00 AM – 8:00 AM', title: 'Registration & Breakfast' },
      { time: '7:00 AM – 3:00 PM', title: 'Exhibitions' },
      { time: '8:00 AM – 11:30 AM', title: 'CME' },
      { time: '12:00 – 1:00 PM', title: 'Lunch / Sponsor Talk' },
      { time: '1:00 – 2:00 PM', title: 'Jeopardy (OMC/GMC/KMC/Other Telangana Medical Schools)' },
      { time: '2:00 – 3:30 PM', title: 'General Body Meeting' },
      { time: '3:30 – 4:30 PM', title: 'Breakout Sessions' },
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
  const [activeTab, setActiveTab] = useState(agenda[0].date); // Default: first tab active

  return (
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
          <div className="agenda-date">{day.date}</div>
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
  );
};

export default AgendaComponent;
