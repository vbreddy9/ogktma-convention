import React from 'react';
import '../styles/Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© OGKTMA USA • info@ogktma.org • (630) 990‑1111</p>
      <div className="social-icons">
        <a href="#" aria-label="Facebook"><FaFacebookF /></a>
        <a href="#" aria-label="Twitter"><FaTwitter /></a>
        <a href="#" aria-label="Instagram"><FaInstagram /></a>
        <a href="#" aria-label="YouTube"><FaYoutube /></a>
      </div>
    </footer>
  );
};

export default Footer;
