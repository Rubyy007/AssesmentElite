const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const paginationMiddleware = require("../middleware/paginationMiddleware");

router.get("/", paginationMiddleware(Product), (req, res) => {
    res.json(res.paginationResults);
});

module.exports = router;
