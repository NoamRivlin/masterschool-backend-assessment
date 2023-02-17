//Require axios to make API calls
const axios = require('axios');
const baseURL = 'https://api.unsplash.com';
const apiKey = process.env.UNSPLASH_ACCESS_KEY;

const getPhotosURLs = async (req, res) => {
  try {
    const callPhotos = await axios.get(
      `${baseURL}/photos/?client_id=${apiKey}`
    );
    const data = await callPhotos.data;
    console.log(data);
    const rawPhotosURL = data.map((photo) => photo.urls.raw);
    console.log('rawPhotosURL', rawPhotosURL);
    res.status(200).json({ rawPhotosURL });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
// example ->   "id": "2qoJ4RMvnYA",
const getPhotoById = async (req, res) => {
  try {
    const { id } = req.params;
    const callPhoto = await axios.get(
      `${baseURL}/photos/${id}/?client_id=${apiKey}`
    );
    const data = await callPhoto.data;
    //asked for a photo obj not URL...
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Not found.' });
  }
};

//for example-> username: 'weriaroslav'
const getUserPhotosByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const callUserPhotos = await axios.get(
      `${baseURL}/users/${username}/photos/?client_id=${apiKey}`
    );

    const userPhotosData = callUserPhotos.data;

    const userPhotos = userPhotosData.map((photo) => {
      return {
        id: photo.id,
        username,
        url: photo.urls.raw,
        description:
          photo.description === null
            ? 'No description provided.'
            : photo.description,
      };
    });
    console.log('✔');

    res.status(200).json({ username, userPhotos });
  } catch (error) {
    // could there be more than one error? leaving it as an array an not error.response.data[0]
    console.log('!!!!!!!!!!!!!!!!!!');
    res.status('error').json({
      message: error.response.data,
    });
  }
};
module.exports = {
  getPhotosURLs,
  getPhotoById,
  getUserPhotosByUsername,
};
