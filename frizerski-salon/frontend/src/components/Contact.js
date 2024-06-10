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
            const response = await fetch('http://localhost:3307/api/contact', {
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
            <form onSubmit={handleSubmit} id="contactform">
                <div className="form-group">
                    <label htmlFor="name">Ime:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
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
                        autoComplete="email"
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
                        autoComplete="off"
                    />
                </div>
                <button type="submit" autoComplete="off">Pošalji</button>
            </form>

            <div className="map">
            <h2>Naša lokacija</h2>
                <iframe
                    title="Google Map Location of Our Office"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11440.375756221229!2d17.9235196!3d44.2051316!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475ee230c79f5f13%3A0x8874c26364dafd8!2sStudentski%20centar%20Zenica!5e0!3m2!1sen!2sba!4v1717380782238!5m2!1sen!2sba"
                    width="600"
                    height="450"
                    style={{border:0}}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    );
};

export default Contact;