const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    db.query('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)', [name, email, message], async (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ message: 'Greška pri slanju poruke. Molimo pokušajte kasnije.' });
        } else {
        res.status(200).json({ message: 'Poruka uspješno poslana.' });
        }
    });
});

module.exports = router;