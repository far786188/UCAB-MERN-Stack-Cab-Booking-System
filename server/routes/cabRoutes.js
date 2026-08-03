const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");
const { protect } = require("../middleware/authMiddleware");

const {
    addCab,
    updateCab,
    deleteCab,
    getAllCabs
} = require("../controllers/cabController");

// Add Cab
router.post(
    "/add",
    protect,
    upload.single("image"),
    addCab
);

// Update Cab
router.put(
    "/:id",
    protect,
    upload.single("image"),
    updateCab
);

// Delete Cab
router.delete(
    "/:id",
    protect,
    deleteCab
);

// Get All Cabs
router.get("/all", getAllCabs);

module.exports = router;