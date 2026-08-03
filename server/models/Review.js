const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
{
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
        required: true
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    review: {
        type: String,
        trim: true
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Review", reviewSchema);