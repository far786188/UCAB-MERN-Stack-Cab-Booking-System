const User = require("../models/User");
const Driver = require("../models/Driver");
const Cab = require("../models/Cab");
const Booking = require("../models/Booking");

const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalDrivers = await Driver.countDocuments();

    const totalCars = await Cab.countDocuments();

    const totalBookings = await Booking.countDocuments();

    const completedRides = await Booking.countDocuments({
      status: "Completed",
    });

    res.json({
      totalUsers,
      totalDrivers,
      totalCars,
      totalBookings,
      completedRides,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};