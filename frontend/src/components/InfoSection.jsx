import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import "../styles/InfoSection.css";

const InfoSection = () => {
  return (
    <section className="info-section" id='programe'>
      <h2 className="info-heading">
        Get the latest info about <span>38TH OGKTMA CONVENTION & SCIENTIFIC ASSEMBLY</span>
      </h2>

      <div className="info-row">
        <FaCalendarAlt className="info-icon" />
        <div><strong>When:</strong> SEP 5th - 7th, 2025</div>
      </div>

      <div className="info-row">
        <FaMapMarkerAlt className="info-icon" />
        <div>
          <strong>Where:</strong> Marriott Louisville East,
          Embassy Square BLVD, Louisville, KY 40299
        </div>
      </div>

      <p className="info-description">
        This conference will host Physicians, Healthcare professionals, and leaders from across the world for a dynamic exchange of ideas, a collaborative effort to shape the future of healthcare on a global scale. We invite you to be an active participant in this transformative journey.
      </p>
    </section>
  );
};

export default InfoSection;
