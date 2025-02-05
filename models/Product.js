const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    startDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    freeDelivery: { type: Boolean, default: false },
    deliveryAmount: { type: Number },
    images: [String],
    url: { type: String, unique: true, required: true },
    oldPrice: { type: Number, required: true },
    newPrice: { type: Number, required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Product", productSchema);
