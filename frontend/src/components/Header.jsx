import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import heroimage from '../assets/ogktma-logo.webp';
import { Link } from 'react-router-dom';
import { FaChair } from 'react-icons/fa'; // Font Awesome Chair icon

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <img src={heroimage} alt="AAPI Logo" className="logo" />

        <div className="menu-toggle" onClick={toggleMenu}>
          <span></span><span></span><span></span>
        </div>

        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <a href="#about" onClick={toggleMenu}>About</a>
          <a href="#programe" onClick={toggleMenu}>Programs</a>
          <a href="#dignitaries" onClick={toggleMenu}>Dignitaries</a>
          <a href="#packages" onClick={toggleMenu}>Packages</a>
          <a href="#contact" onClick={toggleMenu}>Contact</a>
          <a href="#packages" className="btn nav-btn" onClick={toggleMenu}>
            <FaChair style={{ marginRight: '0.5rem' }} /> Register Now
          </a>
        </nav>

      </div>
    </header>
  );
};

export default Header;
