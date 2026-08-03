const Cab = require("../models/Cab");

// Add Cab
const addCab = async (req, res) => {
    try {
        const {
            driver,
            carName,
            carNumber,
            carType,
            seats,
            pricePerKm,
        } = req.body;


        console.log("Body:", req.body);
        console.log("File:", req.file);
        console.log("User:", req.user);

        // Check if cab already exists
        const cabExists = await Cab.findOne({ carNumber });

        if (cabExists) {
            return res.status(400).json({
                message: "Cab already exists"
            });
        }

        // Create Cab
        const cab = await Cab.create({
            driver,
            carName,
            carNumber,
            carType,
            seats,
            pricePerKm,
            image: req.file ? req.file.filename : ""
        });

        console.log(cab);

        res.status(201).json({
            message: "Cab Added Successfully",
            cab
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Cabs
const getAllCabs = async (req, res) => {
    try {
        const cabs = await Cab.find().populate(
            "driver",
            "name email phone"
        );

        res.status(200).json(cabs);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update Cab
const updateCab = async (req, res) => {
    try {
        const cab = await Cab.findById(req.params.id);

        if (!cab) {
            return res.status(404).json({
                message: "Cab not found"
            });
        }

        cab.carName = req.body.carName || cab.carName;
        cab.carNumber = req.body.carNumber || cab.carNumber;
        cab.carType = req.body.carType || cab.carType;
        cab.seats = req.body.seats || cab.seats;
        cab.pricePerKm = req.body.pricePerKm || cab.pricePerKm;

        if (req.file) {
            cab.image = req.file.filename;
        }

        const updatedCab = await cab.save();

        res.json({
            message: "Cab updated successfully",
            cab: updatedCab
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete Cab
const deleteCab = async (req, res) => {
    try {
        const cab = await Cab.findById(req.params.id);

        if (!cab) {
            return res.status(404).json({
                message: "Cab not found"
            });
        }

        await Cab.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Cab deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addCab,
    getAllCabs,
    updateCab,
    deleteCab
};