const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
    },

    cab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cab",
        required: true
    },

    pickupLocation: {
        type: String,
        required: true
    },

    dropLocation: {
        type: String,
        required: true
    },

    bookingDate: {
        type: String,
        default: ""
    },

    bookingTime: {
        type: String,
        default: ""
    },

    distance: {
        type: Number,
        required: true
    },

    fare: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema);