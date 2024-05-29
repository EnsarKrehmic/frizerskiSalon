import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Prijava uspešna!');
                onLogin(result.user);
            } else {
                alert(result.message || 'Došlo je do greške pri prijavi. Molimo pokušajte ponovo.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Došlo je do greške pri prijavi. Molimo pokušajte ponovo.');
        }
    };

    return (
        <div className="login">
            <h1>Prijava</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Lozinka:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Prijavi se</button>
            </form>
        </div>
    );
};

export default Login;