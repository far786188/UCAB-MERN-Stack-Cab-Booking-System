const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
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

    amount: {
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        enum: ["Cash", "Card", "UPI"],
        default: "UPI"
    },

    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Payment", paymentSchema);