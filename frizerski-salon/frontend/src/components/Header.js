import React from 'react';
import { Link } from 'react-router-dom';
import useNavbar from '../hooks/useNavbar';
import './Header.css';
import './Home.css';
import './About.css';
import './Services.css';
import './Styles.css';
import './Pricing.css';
import './Review.css';
import './Visit.css';
import './Contact.css';

function Header() {
  useNavbar();
  
  return (
    <section className="header">
      <a href="/main" className="logo"> Frizerski salon </a>
        <nav className="navbar">
          <div id="close-navbar" className="fas fa-times"></div>
          <Link to="/main">POČETNA</Link>
          <Link to="/about">O NAMA</Link>
          <Link to="/services">USLUGE</Link>
          <Link to="/styles">STILOVI</Link>
          <Link to="/pricing">CIJENA</Link>
          <Link to="/review">RECENZIJE</Link>
          <Link to="/visit">TERMIN</Link>
          <Link to="/login">PRIJAVA</Link>
          <Link to="/contact">KONTAKT</Link>
        </nav>
      <div id="menu-btn" className="fas fa-bars"></div>
    </section>
  );
}

export default Header;