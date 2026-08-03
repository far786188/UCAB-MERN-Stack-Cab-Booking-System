const Booking = require("../models/Booking");
const Cab = require("../models/Cab");

// Book Cab
const bookCab = async (req, res) => {
    try {
        const {
            cab,
            pickupLocation,
            dropLocation,
            bookingDate,
            bookingTime,
            distance
        } = req.body;

        const selectedCab = await Cab.findById(cab);

        if (!selectedCab) {
            return res.status(404).json({
                message: "Cab not found"
            });
        }

        const fare = distance * selectedCab.pricePerKm;

       const booking = await Booking.create({
            user: req.user.id,
            driver: selectedCab.driver,
            cab,
            pickupLocation,
            dropLocation,
            bookingDate,
            bookingTime,
            distance,
            fare,
            status: "Pending"
        });

        res.status(201).json({
            message: "Cab Booked Successfully",
            booking
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get User Bookings
const getMyBookings = async (req, res) => {
    try {

        const bookings = await Booking.find({
            user: req.user.id
        }).populate("cab");

        res.status(200).json(bookings);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get Driver Bookings
const getDriverBookings = async (req, res) => {
    try {

        const bookings = await Booking.find({ driver: req.user.id })
            .populate("user", "name email phone")
            .populate("cab");

        res.status(200).json(bookings);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Accept Booking
const acceptBooking = async (req, res) => {
    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        booking.status = "Accepted";

        await booking.save();

        res.status(200).json({
            message: "Booking Accepted Successfully",
            booking
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Reject Booking
const rejectBooking = async (req, res) => {
    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        booking.status = "Rejected";

        await booking.save();

        res.status(200).json({
            message: "Booking Rejected Successfully",
            booking
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Start Ride
const startRide = async (req, res) => {
    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        booking.status = "Ride Started";

        await booking.save();

        res.status(200).json({
            message: "Ride Started Successfully",
            booking
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Complete Ride
const completeRide = async (req, res) => {
    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        booking.status = "Completed";

        await booking.save();

        res.status(200).json({
            message: "Ride Completed Successfully",
            booking
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Cancel Booking
const cancelBooking = async (req, res) => {
    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        // Only owner can cancel
        if (booking.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not Authorized"
            });
        }

        // Don't allow cancellation after ride starts
        if (
            booking.status === "Ride Started" ||
            booking.status === "Completed"
        ) {
            return res.status(400).json({
                message: "Cannot cancel this booking"
            });
        }

        booking.status = "Cancelled";

        await booking.save();

        res.status(200).json({
            message: "Booking Cancelled Successfully",
            booking
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get All Bookings (Admin)
const getAllBookings = async (req, res) => {
    try {

        const bookings = await Booking.find()
            .populate("user", "name email phone")
            .populate("driver", "name email phone")
            .populate("cab");

        res.status(200).json(bookings);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    bookCab,
    getMyBookings,
    getDriverBookings,
    acceptBooking,
    rejectBooking,
    startRide,
    completeRide,
    cancelBooking,
    getAllBookings
};