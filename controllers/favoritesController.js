//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const asyncHandler = require('express-async-handler');
const FavoritePhoto = require('../models/favoritePhotoModel');

const getFavoritePhotos = asyncHandler(async (req, res) => {
  console.log('Get favorites');
  const favorites = await FavoritePhoto.find({ user: req.user.id });
  // no need to check for user because all are protected routes
  console.log(favorites);
  if (!favorites.length) {
    res.status(400);
    throw new Error("This user doesn't have favorite photos at the moment");
  }

  res.status(200).json(favorites);
});
const addFavoritePhoto = asyncHandler(async (req, res) => {
  console.log('Add favorite');
  const { url, description, username, explanation } = req.body;
  if (!url || !username) {
    res.status(400);
    throw new Error('Add url and username values');
  }
  const addFavorite = await FavoritePhoto.create({
    user: req.user.id,
    url,
    description,
    username,
    explanation,
  });
  res.status(201).json(addFavorite);
});
// 63f37973262dd82313e30f26

const editFavoritePhoto = asyncHandler(async (req, res) => {
  console.log('Edit favorite');
  const favorite = await FavoritePhoto.findById(req.params.id);

  if (!favorite) {
    res.status(400);
    throw new Error("Couldn't edit photo: photo not found");
  }

  if (!req.body.explanation) {
    res.status(400);
    throw new Error('To edit explanation, add an explanation value 🧠');
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
    throw new Error("Couldn't delete photo: photo not found");
  }

  res.status(201).json(deletedFavorite);
});

module.exports = {
  getFavoritePhotos,
  addFavoritePhoto,
  editFavoritePhoto,
  deleteFavoritePhoto,
};
