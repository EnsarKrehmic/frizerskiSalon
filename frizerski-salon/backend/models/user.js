// Uvoz modula za bazu podataka
const db = require('../config/db');

// Definicija modela User
const User = {
    // Metoda za kreiranje novog korisnika
    create: (username, password, email, callback) => {
        const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        db.query(query, [username, password, email], callback);
    },
    
    // Metoda za dohvaćanje svih korisnika
    getAll: (callback) => {
        const query = 'SELECT * FROM users';
        db.query(query, callback);
    },
    
    // Metoda za dohvaćanje korisnika po ID-u
    getById: (id, callback) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        db.query(query, [id], callback);
    },
    
    // Metoda za ažuriranje korisnika
    update: (id, username, password, email, callback) => {
        const query = 'UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?';
        db.query(query, [username, password, email, id], callback);
    },
    
    // Metoda za brisanje korisnika
    delete: (id, callback) => {
        const query = 'DELETE FROM users WHERE id = ?';
        db.query(query, [id], callback);
    }
};

// Izvoz modula User
module.exports = User;
