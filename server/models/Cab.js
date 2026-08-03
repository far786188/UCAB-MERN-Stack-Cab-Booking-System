const mongoose = require("mongoose");

const cabSchema = new mongoose.Schema(
{
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
    },

    carName: {
        type: String,
        required: true
    },

    carNumber: {
        type: String,
        required: true,
        unique: true
    },

    carType: {
        type: String,
        required: true
    },

    seats: {
        type: Number,
        required: true
    },

    pricePerKm: {
        type: Number,
        required: true
    },

    image: {
        type: String,
        default: ""
    },

    available: {
        type: Boolean,
        default: true
    }

},
{ timestamps: true });

module.exports = mongoose.model("Cab", cabSchema);