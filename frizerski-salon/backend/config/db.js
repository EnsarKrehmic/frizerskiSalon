/**
 * This module exports a connection object to the MySQL database.
 * It uses environment variables to connect to the database.
 * The connection is created using the mysql2 package.
 */

const mysql = require('mysql2'); // Importing the mysql2 package

// Importing the dotenv package to load environment variables from .env file
require('dotenv').config();

/**
 * The connection object is created using the mysql2.createConnection method.
 * The connection parameters are set from the environment variables.
 */
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Database host
  user: process.env.DB_USER, // Database user
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME, // Database name
  port: 3366, // Database port
});

/**
 * Logging the database connection parameters.
 */
console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_NAME);

/**
 * The connection.connect method is used to connect to the database.
 * If there is an error, it is logged.
 * If the connection is successful, it is logged.
 */
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

/**
 * The connection object is exported so it can be used in other modules.
 */
module.exports = connection;