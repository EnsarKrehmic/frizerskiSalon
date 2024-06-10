import React, { useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import useNavbar from '../hooks/useNavbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    axios.get('http://localhost:3307/api/user', { withCredentials: true })
      .then(response => setUser(response.data))
      .catch(error => console.error("Error fetching user information", error));
  }, [setUser]);

  return (
    <section className="header">
      <a href="/main" className="logo">Frizerski salon</a>
      <nav className="navbar">
        <div id="close-navbar" className="fas fa-times"></div>
        <Link to="/main">POČETNA</Link>
        <Link to="/about">O NAMA</Link>
        <Link to="/services">USLUGE</Link>
        <Link to="/styles">STILOVI</Link>
        <Link to="/pricing">CIJENA</Link>
        <Link to="/review">RECENZIJE</Link>
        <Link to="/visit">TERMIN</Link>
        <Link to="/contact">KONTAKT</Link>
        {!user ? (
          <Link to="/login">PRIJAVA</Link>
        ) : (
          <>
            {user.role === 'USER' && <Link to="/profile">PROFIL</Link>}
            {user.role === 'ADMIN' && <Link to="/admin">ADMIN</Link>}
          </>
        )}
      </nav>
      <div id="menu-btn" className="fas fa-bars"></div>
    </section>
  );
}

export default Header;