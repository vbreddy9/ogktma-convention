import React from 'react';
import '../styles/Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        © OGKTMA USA •{" "}
        <a href="mailto:info@ogktma.org">info@ogktma.org</a> |
        Email: <a href="mailto:ssandella@yahoo.com">ssandella@yahoo.com</a> |
        Call: <a href="tel:+15023338929">502-333-8929</a>
      </p>
      
    </footer>
  );
};

export default Footer;
