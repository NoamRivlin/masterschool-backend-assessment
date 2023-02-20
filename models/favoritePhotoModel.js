const mongoose = require('mongoose');

const favoritePhotoSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  url: {
    type: String,
    required: [true, 'Add photo URL'],
  },
  username: {
    type: String,
    required: [true, "Add the author's username"],
  },
  description: {
    type: String,
  },
  explanation: {
    type: String,
  },
});

module.exports = mongoose.model('FavoritePhoto', favoritePhotoSchema);
