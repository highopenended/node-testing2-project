const express = require('express');
const db = require('./db-config');
const userRoutes = require('./api/users/users-router');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the Server Testing Module API!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});