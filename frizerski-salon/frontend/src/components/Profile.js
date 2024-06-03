import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3307/api/user-profile')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error("Error fetching user data", error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            });
    }, [navigate]);

    if (!user) {
        return <div>Učitavanje...</div>;
    }

    return (
        <div>
            <h1>Profil korisnika</h1>
            <p><strong>Ime:</strong> {user.firstName}</p>
            <p><strong>Prezime:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
}

export default Profile;