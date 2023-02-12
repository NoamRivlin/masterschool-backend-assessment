const express = require('express');
const router = express.Router();
const axios = require('axios');
const baseUrl = 'https://api.unsplash.com/photos';

router.route('/').get(async (req, res) => {
  try {
    const callPhotos = await axios.get(
      `${baseUrl}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const data = await callPhotos.data;
    const rawPhotosURL = data.map((photo) => photo.urls.raw);
    console.log('rawPhotosURL', rawPhotosURL);
    res.status(200).json({ rawPhotosURL });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
