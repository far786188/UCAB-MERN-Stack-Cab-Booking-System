const Review = require("../models/Review");
const Booking = require("../models/Booking");

// Add Review
const addReview = async (req, res) => {

    try {

        const { bookingId, rating, review } = req.body;

        const booking = await Booking.findById(bookingId);

        console.log("Booking Status:", booking.status);
        console.log("Booking ID:", bookingId);
        console.log("Booking:", booking);

        if (!booking) {

            return res.status(404).json({
                message: "Booking not found"
            });

        }

        if (booking.status !== "Completed") {

            console.log("Inside IF block");
            console.log("Actual status =", booking.status);

            return res.status(400).json({
                message: "Ride is not completed yet"
         });

        }

        console.log("Status check passed");

        const existingReview = await Review.findOne({
            booking: bookingId
        });

        if (existingReview) {

            return res.status(400).json({
                message: "Review already submitted"
            });

        }

        const newReview = await Review.create({

            booking: bookingId,
            user: req.user.id,
            driver: booking.driver,
            rating,
            review

        });

        res.status(201).json({

            message: "Review Added Successfully",
            review: newReview

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    addReview
};