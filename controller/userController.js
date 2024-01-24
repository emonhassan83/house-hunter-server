const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//register a user
const createUser = asyncHandler(async (req, res) => {
  const {email} = req.body;

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
    throw new Error("User already exists");
  }
});

//* Login a user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //? check if user already exists or not
    const findUser = await User.findOne({ email });

    const tokenData = {
      user: findUser.name,
      email: findUser.email,
      role: findUser.role
    }

    if (findUser && (await findUser.isPasswordMatched(password))) {
      res.json({
        success: true,
        message: "User login successfully",
        token: generateToken(tokenData),
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  });

  //* Get all user
const getAllUser = asyncHandler(async (req, res) => {
    try {
      const getAllUsers = await User.find();
      res.json({
        success: true,
        message: "Users retrieved successfully!",
        data: getAllUsers,
      });
    } catch (error) {
      throw new Error(error);
    }
  });
  
  //* Get a single user
  const getAUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const getAUser = await User.findById(id);
      res.json({
        success: true,
        message: "Users retrieved successfully!",
        data: getAUser,
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  //* Delete a single user
const deleteAUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
       await User.findByIdAndDelete(id);
      res.json({
        success: true,
        message: "Users deleted successfully!",
      });
    } catch (error) {
      throw new Error(error);
    }
  });

module.exports = {
    createUser,
    loginUser,
    getAllUser,
    getAUser,
    deleteAUser
}