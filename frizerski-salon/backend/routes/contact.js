const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Ruta za kontakt
router.post('/contact', (req, res) => {
    const { firstName, email, message } = req.body;
    db.query('INSERT INTO contacts (firstName, email, message) VALUES (?, ?, ?)', [firstName, email, message], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ message: 'Greška pri slanju poruke. Molimo pokušajte kasnije.' });
        } else {
        res.status(200).json({ message: 'Poruka uspješno poslana.' });
        }
    });
});

module.exports = router;