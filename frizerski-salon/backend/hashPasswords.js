/**
 * Connects to the database and hashes the passwords of all users
 * whose passwords are not already hashed.
 */

// Import the required modules
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3366,
});

/**
 * Connect to the database.
 */
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');

  // Select all users from the database
  connection.query('SELECT id, email, password FROM users', async (error, results) => {
    if (error) {
      console.error('Error fetching users:', error);
      connection.end();
      return;
    }

    // Iterate through all users
    for (let user of results) {
      // Check if password is already hashed
      if (!user.password.startsWith('$2b$')) {
        try {
          // Hash the password
          const hashedPassword = await bcrypt.hash(user.password, 10);

          // Update the user's password with the hashed version
          connection.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, user.id], (updateError) => {
            if (updateError) {
              console.error(`Greška pri ažuriranju lozinke korisnika ${user.email}:`, updateError);
            } else {
              console.log(`Lozinka ažurirana za korisnika ${user.email}`);
            }
          });
        } catch (hashError) {
          console.error(`Greška pri heširanju lozinke za korisnika ${user.email}:`, hashError);
        }
      } else {
        console.log(`Lozinka za korisnika ${user.email} je već heširana.`);
      }
    }

    // Close the database connection
    connection.end();
  });
});