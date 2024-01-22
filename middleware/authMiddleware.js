const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //console.log(decoded);  => { id: '64db3c6a480a24316ff952a3', iat: 1692089617, exp: 1692348817 }
      const user = await User.findById(decoded?.id);
      req.user = user;
      next();
    }
  } catch (error) {
    throw new Error("Not authorized token expired!");
  }
});

module.exports = { authMiddleware };
