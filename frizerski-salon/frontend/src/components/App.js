import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import AboutUs from './AboutUs';
import Login from './Login';
import Register from './Register';
import Contact from './Contact';
import AdminPanel from './AdminPanel';
import './App.css';

const App = () => {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <Router>
            <div className="app">
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about-us">O nama</Link></li>
                        {user ? (
                            <>
                                {user.role === 'admin' && <li><Link to="/admin">Admin Panel</Link></li>}
                                <li><button onClick={handleLogout}>Logout</button></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login">Prijava</Link></li>
                                <li><Link to="/register">Registracija</Link></li>
                            </>
                        )}
                        <li><Link to="/contact">Kontakt</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/contact" element={<Contact />} />
                    {user && user.role === 'admin' && <Route path="/admin" element={<AdminPanel />} />}
                </Routes>
            </div>
        </Router>
    );
};

export default App;