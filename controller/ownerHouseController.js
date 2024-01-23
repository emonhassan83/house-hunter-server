const House = require("../models/ownerHouseModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//* GET /api/house-owner/all-owner-houses
const getAllOwnerHouses = asyncHandler(async (req, res) => {
  const houses = await House.find();
  if (!houses) {
    throw new Error("Houses not found!");
  }

  res.json({
    success: true,
    message: "All owner houses retrieve successfully!",
    data: houses,
  });
});

//* GET /api/house-owner/houses
const getHousesByOwner = asyncHandler(async (req, res) => {
  const ownerId = req.user.id;

  // Retrieve the list of houses owned by the logged-in House Owner
  const houses = await House.find({ owner: ownerId });
  if (!houses) {
    throw new Error("Houses not found!");
  }

  res.json({
    success: true,
    message: "Houses retrieve successfully!",
    data: houses,
  });
});

//* GET /api/house-owner/house/:id
const getAHouseByOwner = asyncHandler(async (req, res) => {
  const ownerId = req.user.id;
  const roomId = req.params.id;

  const query = {
    owner: ownerId,
    _id: roomId,
  };

  const houses = await House.findOne(query);
  if (!houses) {
    throw new Error("Houses not found!");
  }

  res.json({
    success: true,
    message: "Houses retrieve successfully!",
    data: houses,
  });
});

//* POST /api/house-owner/add-house
const addHouse = asyncHandler(async (req, res) => {
  const ownerId = req.user.id;
  const owner = await User.findById(ownerId);

  if (owner.role === "owner") {
    const newHouse = new House({
      ...req.body,
    });

    //? Save the new house to the database
    await newHouse.save();
    res.json({
      success: true,
      message: "House added successfully!",
      data: newHouse,
    });
  } else {
    throw new Error("Only House Owners can add a new house.");
  }
});

//* DELETE /api/house-owner/delete-house/:houseId
const deleteHouse = asyncHandler(async (req, res) => {
  const { houseId } = req.params;

  const deleteStatus = await House.findByIdAndDelete(houseId);
  if (!deleteStatus) {
    throw new Error("Houses not deleted!");
  }
  res.json({
    success: true,
    message: "House deleted successfully",
  });
});

//* PUT /api/house-owner/edit-house/:houseId
const updateHouse = asyncHandler(async (req, res) => {
  const { houseId } = req.params;

  const updatedHouse = await House.findByIdAndUpdate(houseId, req.body, {
    new: true,
  });
  if (!updatedHouse) {
    throw new Error("Houses not updated!");
  }

  res.json({
    success: true,
    message: "House updated successfully",
    house: updatedHouse,
  });
});

module.exports = {
  getAllOwnerHouses,
  getHousesByOwner,
  getAHouseByOwner,
  addHouse,
  deleteHouse,
  updateHouse,
};
