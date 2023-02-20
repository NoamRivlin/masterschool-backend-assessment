const express = require('express');
const {
  addFavoritePhoto,
  editFavoritePhoto,
  deleteFavoritePhoto,
  getFavoritePhotos,
} = require('../controllers/favoritesController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router
  .route('/')
  .get(protect, getFavoritePhotos)
  .post(protect, addFavoritePhoto);
router
  .route('/:id')
  .put(protect, editFavoritePhoto)
  .delete(protect, deleteFavoritePhoto);

module.exports = router;
