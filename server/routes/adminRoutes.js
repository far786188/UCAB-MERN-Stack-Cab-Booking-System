const express = require("express");
const router = express.Router();

const {
    registerAdmin,
    loginAdmin,
    getAdminProfile,
    getAllUsers,
    getAllDrivers,
    deleteUser,
    deleteDriver,
    getDashboardStats
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");

// Register Admin
router.post("/register", registerAdmin);

// Login Admin
router.post("/login", loginAdmin);

// Get Admin Profile
router.get("/profile", protect, getAdminProfile);

// Get All Drivers
router.get("/drivers", protect, getAllDrivers);

// Get All Users
router.get("/users", protect, getAllUsers);

// Dashboard Statistics
router.get("/dashboard", protect, getDashboardStats);

// Delete User
router.delete("/users/:id", protect, deleteUser);

// Delete Driver
router.delete("/drivers/:id", protect, deleteDriver);

module.exports = router;