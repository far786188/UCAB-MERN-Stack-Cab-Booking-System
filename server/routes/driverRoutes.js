const express = require("express");
const router = express.Router();

const {
    registerDriver,
    loginDriver,
    getDriverProfile,
    getAllDrivers
} = require("../controllers/driverController");

const { protect } = require("../middleware/authMiddleware");

// Register Driver
router.post("/register", registerDriver);

// Login Driver
router.post("/login", loginDriver);

// Get Driver Profile
router.get("/profile", protect, getDriverProfile);

router.get("/all", getAllDrivers);

module.exports = router;