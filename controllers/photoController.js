//Require axios to make API calls
const axios = require('axios');
const baseURL = 'https://api.unsplash.com';

const getPhotosURLs = async (req, res) => {
  try {
    const callPhotos = axios.get(`${baseURL}/photos`);
    console.log(callPhotos);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = {
  getPhotosURLs,
};
