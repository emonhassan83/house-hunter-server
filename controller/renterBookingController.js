const House = require("../models/ownerHouseModel");
const BookingHouse = require("../models/renterBookingModel");
const asyncHandler = require("express-async-handler");

//* POST /api/house-renter/book-house/:houseId
const bookHouse = asyncHandler(async (req, res) => {
  const { houseId } = req.params;
  const { name, email, phoneNumber } = req.body;
  const user = req.user;

  //* Booking house only renter
  if (user.role !== "renter") {
    throw new Error("House booked only renter!");
  }

  // Check the total number of houses already booked by the user
  const totalBookedHouses = await BookingHouse.countDocuments({
    email: user.email,
  });

  // Check if the user has already booked the maximum allowed houses
  if (totalBookedHouses >= 2) {
    throw new Error("You can only book a maximum of two houses.");
  }

  // Validate if the house exists
  const house = await House.findById(houseId);

  //   if the house not exists
  if (!house) {
    throw new Error("House not found!");
  }

  // if the house already booked
  if (house.isBooked) {
    throw new Error("This house already booked!");
  }

  // Set the house as booked
  house.isBooked = true;
  await house.save();

  // Create a new booking
  const newBooking = new BookingHouse({
    name,
    email,
    phoneNumber,
    bookedHouses: [houseId],
  });

  // Save the new booking to the database
  await newBooking.save();

  res.json({
    success: true,
    message: "House booked successfully!",
    data: newBooking,
  });
});

//* GET /api/house-renter/bookings
const getBookedHouses = asyncHandler(async (req, res) => {
  const bookingHouses = await BookingHouse.find().populate("bookedHouses");
  res.json({
    success: true,
    message: "Booked houses retrieved successfully!",
    data: bookingHouses,
  });

  if (!bookingHouses) {
    throw new Error("Booking house not found!");
  }
});

//* GET /api/house-renter/bookings/:bookingId
const getABookedHouse = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const bookingHouses = await BookingHouse.findOneAndDelete(bookingId).populate(
    "bookedHouses"
  );

  res.json({
    success: true,
    message: "Booked house retrieved successfully!",
    data: bookingHouses,
  });

  if (!bookingHouses) {
    throw new Error("Booking house not found!");
  }
});

//* DELETE /api/house-renter/cancel-booking/:bookingId
const cancelBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const user = req.user;

  // Booking house only renter
  if (user.role !== "renter") {
    throw new Error("Booking cancelation only for renters!");
  }

  // Find the booking by ID
  const booking = await BookingHouse.findById(bookingId);

  // If the booking does not exist
  if (!booking) {
    throw new Error("Booking not found!");
  }

  // Find the associated house and update its status
  const house = await House.findById(booking.bookedHouses[0]); // Assuming a booking is associated with one house
  if (!house) {
    throw new Error("House not found!");
  }

  // Set the house as booked is false
  house.isBooked = false;
  await house.save();

  // Delete the specific booking
  const status = await BookingHouse.findByIdAndDelete(bookingId);

  if (!status) {
    throw new Error("This house can not booking cancel!");
  }

  res.json({
    success: true,
    message: "Booking canceled successfully",
  });
});

module.exports = { bookHouse, getBookedHouses, getABookedHouse, cancelBooking };
