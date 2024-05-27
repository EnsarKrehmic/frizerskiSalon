const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'krehmiicjr',
  password: '3307',
  database: 'hairdresser_database'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});
