const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3307,
});

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

    for (let user of results) {
      if (!user.password.startsWith('$2b$')) { // Check if password is already hashed
        try {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          // Update the user's password with the hashed version
          connection.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, user.id], (updateError) => {
            if (updateError) {
              console.error(`Error updating password for user ${user.email}:`, updateError);
            } else {
              console.log(`Password updated for user ${user.email}`);
            }
          });
        } catch (hashError) {
          console.error(`Error hashing password for user ${user.email}:`, hashError);
        }
      } else {
        console.log(`Password for user ${user.email} is already hashed.`);
      }
    }
    connection.end();
  });
});