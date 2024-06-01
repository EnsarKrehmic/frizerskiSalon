const express = require('express');
const User = require('../models/user');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const cors = require('cors');
const router = express.Router();

// Ruta za login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`Received login request for email: ${email}`);
    try {
        db.query('SELECT * FROM login WHERE email = ?', [email], async (error, results) => {
            if (error) {
                console.error('Database error:', error);
                return res.status(500).json({ message: 'Greška pri prijavi. Molimo pokušajte ponovo.' });
            }
            console.log('Database query results:', results);
            if (results.length > 0) {
                const user = results[0];
                const isMatch = await bcrypt.compare(password, user.password);
                console.log('Password match:', isMatch);
                if (isMatch) {
                    res.status(200).json({ message: 'Prijava uspješna.', user: { id: user.id, email: user.email, role: user.role } });
                } else {
                    res.status(401).json({ message: 'Pogrešan email ili lozinka.' });
                }
            } else {
                res.status(401).json({ message: 'Pogrešan email ili lozinka.' });
            }
        });
    } catch (err) {
        console.error('Error during login process:', err);
        res.status(500).json({ message: 'Greška pri prijavi. Molimo pokušajte ponovo..' });
    }
});

// Ruta za registraciju novog korisnika
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    // Provera da li korisnik već postoji
    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ message: 'Greška pri prijavi. Molimo pokušajte ponovo.' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Korisnik već postoji' });
        }

        // Heširanje lozinke
        const hashedPassword = await bcrypt.hash(password, 10);

        // Čuvanje korisnika u bazu podataka
        db.query('INSERT INTO users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)', 
            [firstName, lastName, email, hashedPassword, role], 
            (error, results) => {
                if (error) {
                    console.error('Database error:', error);
                    return res.status(500).json({ message: 'Greška pri registraciji korisnika. Molimo pokušajte kasnije.' });
                }
                res.status(201).json({ message: 'Korisnik uspješno registrovan.' });
            });
    });
});

// Ruta za dohvaćanje svih korisnika
router.get('/', (req, res) => {
    User.getAll((err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json(results);
    });
});

// Ruta za dohvaćanje korisnika po ID-u
router.get('/:id', (req, res) => {
    const { id } = req.params;
    User.getById(id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 0) {
            return res.status(404).send('Korisnik nije pronađen.');
        }
        res.status(200).json(result[0]);
    });
});

// Ruta za ažuriranje korisnika
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, password, email } = req.body;
    User.update(id, firstName, lastName, password, email, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Korisnik nije pronađen.');
        }
        res.status(200).send('Korisnik uspješno ažuriran.');
    });
});

// Ruta za brisanje korisnika
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    User.delete(id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Korisnik nije pronađen.');
        }
        res.status(200).send('Korisnik uspješno obrisan.');
    });
});

module.exports = router;