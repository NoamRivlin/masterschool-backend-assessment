//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const asyncHandler = require('express-async-handler');
const FavoritePhoto = require('../models/favoritePhotoModel');

const getFavoritePhotos = asyncHandler(async (req, res) => {
  console.log('Get favorites');
  const favorites = await FavoritePhoto.find({ user: req.user.id });
  res.status(200).json(favorites);
});

const addFavoritePhoto = asyncHandler(async (req, res) => {
  console.log('Add favorite');
  const { url, description, username, explanation } = req.body;
  const addFavorite = await FavoritePhoto.create({
    user: req.user.id,
    url,
    description,
    username,
    explanation,
  });
  res.status(201).json(addFavorite);
});

const editFavoritePhoto = asyncHandler(async (req, res) => {
  console.log('Edit favorite');
  const favorite = await FavoritePhoto.findById(req.params.id);

  if (!favorite) {
    res.status(400);
    throw new Error('Favorite photo not found');
  }

  favorite.explanation = req.body.explanation;
  await favorite.save();
  res.status(201).json(favorite);

  // another way of doind it but validatoins wouldn't work
  // const editedFavorite = await FavoritePhoto.findByIdAndUpdate(
  //   req.params.id,
  //   { explanation: req.body.explanation },
  //   {
  //     new: true,
  //   }
  // );
  // res.status(201).json(editedFavorite);
});

const deleteFavoritePhoto = asyncHandler(async (req, res) => {
  console.log('Delete favorite');
  const deletedFavorite = await FavoritePhoto.findByIdAndDelete(req.params.id);
  if (!deletedFavorite) {
    res.status(400);
    throw new Error('Favorite photo not found');
  }

  res.status(201).json(deletedFavorite);
});

module.exports = {
  getFavoritePhotos,
  addFavoritePhoto,
  editFavoritePhoto,
  deleteFavoritePhoto,
};
