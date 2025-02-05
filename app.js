require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Import Routes
app.use("/api/products", require("./routes/productRoutes"));

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
