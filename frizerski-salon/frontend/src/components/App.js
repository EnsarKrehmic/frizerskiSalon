import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import AboutUs from './AboutUs';
import Login from './Login';

import Contact from './Contact';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app">
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about-us">O nama</Link></li>
                        <li><Link to="/login">Prijava</Link></li>
                        <li><Link to="/contact">Kontakt</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;