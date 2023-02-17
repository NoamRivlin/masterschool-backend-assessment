const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(protect, getMe);

module.exports = router;
