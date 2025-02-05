const Product = require("../models/Product");

// Add a product
const addProduct = async (req, res) => {
    const { name, description, category, startDate, freeDelivery, deliveryAmount, oldPrice, newPrice } = req.body;

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
            vendor: req.user.id,
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { addProduct };
