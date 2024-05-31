import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Poruka je uspešno poslata!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                alert('Došlo je do greške pri slanju poruke. Molimo pokušajte ponovo.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Došlo je do greške pri slanju poruke. Molimo pokušajte ponovo.');
        }
    };

    return (
        <div className="contact">
            <h1>Kontaktirajte nas</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Ime:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                    <label htmlFor="message">Poruka:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Pošalji</button>
            </form>

            <div className="map">
                <h2>Naša lokacija</h2>
                <iframe
                    title="Studentski centar Zenica"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.627981625058!2d20.457275315524607!3d44.8174354790984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a6f18b9f9e3b1%3A0xe6c3b4a287f96c2!2sBelgrade%2C%20Serbia!5e0!3m2!1sen!2s!4v1620479269115!5m2!1sen!2s"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;