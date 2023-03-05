const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Protect endpoints from unauthorized access
const protect = asyncHandler(async (req, res, next) => {
  //Token set to null initially
  let token = null;

  //If user is authorized and the Bearer token is included in the headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //Split the request to isolate only the token and decode it
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Set the request user object to the decoded user
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.log(error);
      // Return a 401 status code if there's an issue with authorization
      res.status(401).json({ message: 'Not Authorized' });
    }
  }
  // If no token is found return with a 401 error
  if (!token) {
    res.status(401).json({ message: 'Missing JWT' });
  }
});

module.exports = { protect };
