const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//register a user
const createUser = asyncHandler(async (req, res) => {
  const {email} = req.body;
  console.log(email);
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    //create a new user
    const newUser = await User.create(req.body);
    res.json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } else {
    //user already exists
    res.json({
        success: false,
        message: "User already exists",
    })
    // throw new Error("User already exists");
  }
});

module.exports = {
    createUser,
}