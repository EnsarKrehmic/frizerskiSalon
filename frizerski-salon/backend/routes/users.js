const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Ruta za registraciju novog korisnika
router.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    User.create(username, password, email, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send('User created successfully');
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