const express = require("express");
const router = express.Router();

const {
    makePayment,
    getPaymentHistory
} = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware");

// Make Payment
router.post("/pay", protect, makePayment);

// Get Payment History
router.get("/history", protect, getPaymentHistory);

module.exports = router;