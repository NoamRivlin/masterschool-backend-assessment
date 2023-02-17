const express = require('express');
const router = express.Router();

const {
  getPhotosURLs,
  getPhotoById,
  getUserPhotosByUsername,
} = require('../controllers/photoController');

router.route('/').get(getPhotosURLs);

// example ->   "id": "2qoJ4RMvnYA",
router.route('/:id').get(getPhotoById);

//for example-> username: 'weriaroslav'
router.route('/user/:username').get(getUserPhotosByUsername);

module.exports = router;
