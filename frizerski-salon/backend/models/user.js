// Uvoz modula za bazu podataka
const db = require('../config/db');

// Definicija modela User
const User = {
    // Metoda za kreiranje novog korisnika
    create: (firstName, lastName, nickname, email, password, callback) => {
        const sql = "INSERT INTO users (firstName, lastName, nickname, email, password) VALUES (?, ?, ?, ?)";
        db.query(sql, [firstName, lastName, nickname, email, password], (err, data) => {
            if(err) {
                return res.json("Greška");
            }
            return res.json(data);
        });
        
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
    update: (id, firstName, lastName, nickname, email, password, callback) => {
        const query = 'UPDATE users SET firstName = ?, lastName = ?, nickname = ?, password = ?, email = ? WHERE id = ?';
        db.query(query, [id, firstName, lastName, nickname, email, password], callback);
    },
    
    // Metoda za brisanje korisnika
    delete: (id, callback) => {
        const query = 'DELETE FROM users WHERE id = ?';
        db.query(query, [id], callback);
    }
};

// Izvoz modula User
module.exports = User;
