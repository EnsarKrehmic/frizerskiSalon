const express = require('express');
const contactRoutes = require('./routes/contact');
const userRoutes = require('./routes/users');
const cors = require('cors');
const path = require('path');
const db = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

app.get('/api/test', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
    } else {
      res.json(results);
    }
  });
});

// API routes
app.use('/api/data', (req, res) => {
    res.json([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
    ]);
});


// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3307;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});