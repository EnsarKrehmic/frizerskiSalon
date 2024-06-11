import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Importing components
import ChosenWorkerAdmin from "./ChosenWorkerAdmin";
import GuestChosenWorker from "./GuestChosenWorker";
import WorkerRegister from "./WorkerRegister";
import WorkerHistory from "./WorkerHistory";
import LogoutButton from "./LogoutButton";
import UpdateWorker from "./UpdateWorker";
import ChosenWorker from "./ChosenWorker";
import AddQuestion from "./AddQuestion";
import { UserContext } from "./UserContext";
import UpdateUser from "./UpdateUser";
import AddWorker from "./AddWorker";
import Services from './Services';
import Register from './Register';
import Pricing from './Pricing';
import Contact from './Contact';
import AddUser from "./AddUser";
import Profile from "./Profile";
import Footer from './Footer';
import Styles from './Styles';
import Review from './Review';
import Header from './Header';
import Guest from "./Guest";
import About from './About';
import Visit from './Visit';
import Login from './Login';
import Admin from './Admin';
import Main from './Main';
import Home from './Home';
import './App.css';

/**
 * App component is the root component of the application.
 * It handles the user state and renders the router.
 */
const App = () => {
    // State to hold the user information
    const [user, setUser] = useState(null);

    /**
     * Function to handle the login event.
     * Updates the user state with the user data.
     * @param {Object} userData - The user data to be set in the state.
     */
    const handleLogin = (userData) => {
        setUser(userData);
    };

    /**
     * Function to handle the logout event.
     * Clears the user state.
     */
    const handleLogout = () => {
        setUser(null);
    };

    /**
     * Effect hook to fetch the user information from the API.
     * Updates the user state with the response data.
     */
    useEffect(() => {
        axios.get('http://localhost:3307/api/user')
            .then(response => setUser(response.data))
            .catch(error => console.error("Error fetching user information", error));
    }, []);

    return (
        // Providing the user state to the child components
        <UserContext.Provider value={{ user, setUser }}>
            <Router>
                {/* Rendering the header component */}
                <Header />
                <Routes>
                    {/* Defining the routes for the application */}
                    <Route path="/" element={<Navigate to="/main" />} />
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
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/logout" element={<LogoutButton onLogout={handleLogout} />} />
                    <Route path="/add-user" element={<AddUser />} />
                    <Route path="/admin/update/:id" element={<UpdateUser />} />
                    <Route path="/add-worker" element={<AddWorker />} />
                    <Route path="/admin/update-worker/:id" element={<UpdateWorker />} />
                    <Route path="/chosen-worker/:id" element={<ChosenWorker />} />
                    <Route path="/admin/chosen-worker/:id" element={<ChosenWorkerAdmin />} />
                    <Route path="/add-question/:id" element={<AddQuestion />} />
                    <Route path="/worker-register/:id" element={<WorkerRegister />} />
                    <Route path="/worker-history/:id" element={<WorkerHistory />} />
                    <Route path="/guest" element={<Guest />} />
                    <Route path="/chosen-worker-guest/:id" element={<GuestChosenWorker />} />
                    <Route path="/footer" element={<Footer />} />
                    {/* Rendering admin routes only if the user is an admin */}
                    {user && user.role === 'ADMIN' && <Route path="/admin" element={<Admin />} />}
                    {/* Rendering profile route only if the user is not a user */}
                    {user && user.role !== 'USER' && <Route path="/profile" element={<Profile />} />}
                </Routes>
            </Router>
        </UserContext.Provider>
    );
}

export default App;