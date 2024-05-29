const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Ruta za kontakt
router.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    db.query('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)', [name, email, message], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ message: 'Error saving contact message. Please try again later.' });
        }
        res.status(200).json({ message: 'Message saved successfully' });
    });
});

module.exports = router;