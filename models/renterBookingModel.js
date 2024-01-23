const mongoose = require('mongoose');

const bookingHouseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      // Assuming Bangladeshi phone numbers
      match: /^\+8801[1-9]\d{8}$/,
    },
    bookingDate: {
        type: Date,
        default: Date.now,
      },
    bookedHouses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('BookingHouse', bookingHouseSchema);
