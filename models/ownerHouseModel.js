const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    roomSize: {
      type: Number,
      required: true,
    },
    picture: {
      type: String, 
      required: true,
    },
    availabilityDate: {
      type: Date,
      required: true,
    },
    rentPerMonth: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
     match: /^01\d{9}$/,
    },
    description: {
      type: String,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("House", houseSchema);
