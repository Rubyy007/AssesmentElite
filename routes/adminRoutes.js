const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const { getAllUsers, createProduct } = require("../controllers/adminController");

router.get("/users", protect, authorize("admin"), getAllUsers);
router.post("/products", protect, authorize("admin"), createProduct);

module.exports = router;
