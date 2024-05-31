const express = require('express');
const User = require('../models/user');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const cors = require('cors');
const router = express.Router();

/*router.post('/register', async (req, res) => {
    const sql = "INSERT INTO login (`name`,`surname`,`email`,`password`) VALUES (?)";
    const { name, surname, email, password } = req.body;
    db.query(sql, [values], (err, data) => {
        if(err) {
            return res.json("Greška");
        }
        return res.json(data);
    })
})

router.post('/login', async (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err) {
            return res.json("Greška");
        }
        if(data.lenght > 0) {
            return res.json("Uspješno");
        } else {
            return res.json("Neuspješno");
        }
    })
})*/

// Ruta za login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`Received login request for email: ${email}`); // Log received email
    try {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if (error) {
                console.error('Database error:', error); // Log database errors
                return res.status(500).json({ message: 'Error logging in. Please try again later.' });
            }
            console.log('Database query results:', results); // Log query results
            if (results.length > 0) {
                const user = results[0];
                const isMatch = await bcrypt.compare(password, user.password);
                console.log('Password match:', isMatch); // Log result of password comparison
                if (isMatch) {
                    res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email, role: user.role } });
                } else {
                    res.status(401).json({ message: 'Invalid email or password' });
                }
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        });
    } catch (err) {
        console.error('Error during login process:', err); // Log any other errors
        res.status(500).json({ message: 'Error logging in. Please try again later.' });
    }
});

// Ruta za registraciju novog korisnika
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    // Provera da li korisnik već postoji
    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ message: 'Error registering user. Please try again later.' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Heširanje lozinke
        const hashedPassword = await bcrypt.hash(password, 10);

        // Čuvanje korisnika u bazu podataka
        db.query('INSERT INTO users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)', 
            [firstName, lastName, email, hashedPassword, role], 
            (error, results) => {
                if (error) {
                    console.error('Database error:', error);
                    return res.status(500).json({ message: 'Error registering user. Please try again later.' });
                }
                res.status(201).json({ message: 'User registered successfully' });
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
            return res.status(404).send('User not found');
        }
        res.status(200).json(result[0]);
    });
});

// Ruta za ažuriranje korisnika
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { username, password, email } = req.body;
    User.update(id, username, password, email, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User updated successfully');
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
            return res.status(404).send('User not found');
        }
        res.status(200).send('User deleted successfully');
    });
});

module.exports = router;