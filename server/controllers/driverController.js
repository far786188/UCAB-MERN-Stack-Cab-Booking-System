const Driver = require("../models/Driver");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// Register Driver
const registerDriver = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone,
            licenseNumber,
            vehicleNumber
        } = req.body;

        const driverExists = await Driver.findOne({ email });

        if (driverExists) {
            return res.status(400).json({
                message: "Driver already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const driver = await Driver.create({
            name,
            email,
            password: hashedPassword,
            phone,
            licenseNumber,
            vehicleNumber
        });

        res.status(201).json({
            message: "Driver Registered Successfully",
            driver: {
                _id: driver._id,
                name: driver.name,
                email: driver.email,
                phone: driver.phone,
                licenseNumber: driver.licenseNumber,
                vehicleNumber: driver.vehicleNumber
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Login Driver
const loginDriver = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find driver
        const driver = await Driver.findOne({ email });

        if (!driver) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, driver.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        // Generate token
        const token = generateToken(driver._id);

        res.status(200).json({
            message: "Driver Login Successful",
            token,
            driver: {
                _id: driver._id,
                name: driver.name,
                email: driver.email,
                phone: driver.phone,
                licenseNumber: driver.licenseNumber,
                vehicleNumber: driver.vehicleNumber
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get Driver Profile
const getDriverProfile = async (req, res) => {
    try {
        const driver = await Driver.findById(req.user.id).select("-password");

        if (!driver) {
            return res.status(404).json({
                message: "Driver not found"
            });
        }

        res.status(200).json(driver);

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


module.exports = {
    registerDriver,
    loginDriver,
    getAllDrivers,
    getDriverProfile
};