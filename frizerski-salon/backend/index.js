const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const db = require('./config/db');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});