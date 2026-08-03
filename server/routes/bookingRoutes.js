const express = require("express");
const router = express.Router();

const {
    bookCab,
    getMyBookings,
    getDriverBookings,
    acceptBooking,
    rejectBooking,
    startRide,
    completeRide,
    cancelBooking,
    getAllBookings
} = require("../controllers/bookingController");

const { protect } = require("../middleware/authMiddleware");

// Book Cab
router.post("/book", protect, bookCab);

// Get My Bookings
router.get("/my", protect, getMyBookings);

router.get("/driver", protect, getDriverBookings);

// Accept Booking
router.put("/accept/:id", protect, acceptBooking);

router.put("/reject/:id", protect, rejectBooking);

router.put("/start/:id", protect, startRide);

router.put("/complete/:id", protect, completeRide);

router.put("/cancel/:id", protect, cancelBooking);

// Get All Bookings (Admin)
router.get("/all", protect, getAllBookings);

module.exports = router;