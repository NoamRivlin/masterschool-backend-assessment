const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();
const connectDB = require('./config/db');
require('dotenv').config();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  res.status(200).json({ message: 'Welcome to the Unsplash API!' });
});
app.use('/api/photos', require('./routes/photoRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.listen(PORT, () => {
  console.log('🚀 on port ' + PORT);
});
