const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();
require('dotenv').config();
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).json({ message: 'Welcome to the Unsplash API!' });
});
app.use('/api/photos', require('./routes/photoRoutes'));

app.listen(PORT, () => {
  console.log('🚀 on port ' + PORT);
});
