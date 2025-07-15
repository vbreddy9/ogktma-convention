// ✅ src/components/AboutSection.jsx
import '../styles/AboutSection.css';
import { FaChair } from 'react-icons/fa'; // Font Awesome Chair icon

const AboutSection = () => {
  return (
    <section id="about" className="about">
      <h2>About OGKTMA</h2>
      <p>Founded in 1982, OGKTMA represents a conglomeration of more than 8,000 practicing physicians in the United States. 1 in every 7 people in the USA is touched by the care of a physician of Indian origin at any given time.</p>
      <a href="#packages" className="btn register-btn">
                <FaChair style={{ marginRight: '0.5rem' }} /> Register Now
              </a>
    </section>
  );
};
export default AboutSection;
