const Payment = require("../models/Payment");
const Booking = require("../models/Booking");

// Make Payment
const makePayment = async (req, res) => {
    try {

        const { bookingId, paymentMethod } = req.body;

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        const payment = await Payment.create({
            booking: booking._id,
            user: booking.user,
            amount: booking.fare,
            paymentMethod,
            paymentStatus: "Paid"
        });

        res.status(201).json({
            message: "Payment Successful",
            payment
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get Payment History
const getPaymentHistory = async (req, res) => {
    try {

        const payments = await Payment.find({
            user: req.user.id
        })
        .populate("booking");

        res.status(200).json(payments);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    makePayment,
    getPaymentHistory
};