const User = require("../models/User");
const Product = require("../models/Product");

// Get all users (staff, vendors, buyers)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: "admin" } });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Create a product
const createProduct = async (req, res) => {
    const { name, description, category, startDate, freeDelivery, deliveryAmount, oldPrice, newPrice } = req.body;

    // Validation
    if (!name || !startDate || !oldPrice || !newPrice) {
        return res.status(400).json({ message: "Required fields are missing" });
    }

    try {
        const expiryDate = new Date(new Date(startDate).getTime() + 7 * 24 * 60 * 60 * 1000); // +7 days
        const productUrl = name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();

        const product = await Product.create({
            name,
            description,
            category,
            startDate,
            expiryDate,
            freeDelivery,
            deliveryAmount,
            oldPrice,
            newPrice,
            url: productUrl,
            vendor: req.user.id, // Admin creating it on behalf of a vendor
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getAllUsers, createProduct };
