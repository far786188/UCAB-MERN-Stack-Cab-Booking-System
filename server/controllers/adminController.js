const User = require("../models/User");
const Driver = require("../models/Driver");
const Cab = require("../models/Cab");
const Booking = require("../models/Booking");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: "30d"
        }
    );
};

// Register Admin
const registerAdmin = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const adminExists = await Admin.findOne({ email });

        if (adminExists) {
            return res.status(400).json({
                message: "Admin already exists"
            });
        }

        const admin = await Admin.create({
            name,
            email,
            password
        });

        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id)
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Login Admin
const loginAdmin = async (req, res) => {

    try {

        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (admin && await admin.matchPassword(password)) {

            res.status(200).json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                token: generateToken(admin._id)
            });

        } else {

            res.status(401).json({
                message: "Invalid Email or Password"
            });

        }

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get Admin Profile
const getAdminProfile = async (req, res) => {

    try {

        const admin = await Admin.findById(req.user.id).select("-password");

        if (!admin) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }

        res.status(200).json(admin);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get All Users
const getAllUsers = async (req, res) => {
    try {

        const users = await User.find().select("-password");

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get All Drivers
const getAllDrivers = async (req, res) => {
    try {

        const drivers = await Driver.find().select("-password");

        res.status(200).json(drivers);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Delete Driver
const deleteDriver = async (req, res) => {
    try {

        const driver = await Driver.findById(req.params.id);

        if (!driver) {
            return res.status(404).json({
                message: "Driver not found"
            });
        }

        await Driver.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Driver deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Dashboard Statistics
const getDashboardStats = async (req, res) => {
    try {

        const totalUsers = await User.countDocuments();
        const totalDrivers = await Driver.countDocuments();
        const totalCabs = await Cab.countDocuments();
        const totalBookings = await Booking.countDocuments();

        res.status(200).json({
            totalUsers,
            totalDrivers,
            totalCabs,
            totalBookings
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    registerAdmin,
    loginAdmin,
    getAdminProfile,
    getAllDrivers,
    getAllUsers,
    deleteUser,
    deleteDriver,
    getDashboardStats
};