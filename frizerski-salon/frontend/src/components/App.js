import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Home from './Home';
import About from './About';
import Services from './Services';
import Styles from './Styles';
import Pricing from './Pricing';
import Review from './Review';
import Visit from './Visit';
import Login from './Login';
import Register from './Register';
import Contact from './Contact';
import AdminPanel from './AdminPanel';
import Footer from './Footer';
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
            <Header />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/main" element={<Main />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/styles" element={<Styles />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/review" element={<Review />} />
                <Route path="/visit" element={<Visit />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/footer" element={<Footer />} />
                {user && user.role === 'admin' && <Route path="/admin" element={<AdminPanel />} />}
            </Routes>
        </Router>
    );
}

export default App;