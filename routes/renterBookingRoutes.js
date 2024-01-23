const express = require('express');
const { bookHouse, getBookedHouses, cancelBooking, getABookedHouse } = require('../controller/renterBookingController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/book-house/:houseId', authMiddleware, bookHouse);
router.get('/bookings', authMiddleware, getBookedHouses);
router.get('/booking/:bookingId', authMiddleware, getABookedHouse);
router.delete('/cancel-booking/:bookingId', authMiddleware, cancelBooking);

module.exports = router;