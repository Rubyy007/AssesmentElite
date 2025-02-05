const paginationMiddleware = (model) => async (req, res, next) => {
    const { search, page = 1, limit = 10 } = req.query;

    try {
        const query = search ? { name: { $regex: search, $options: "i" } } : {};
        const data = await model
            .find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const total = await model.countDocuments(query);

        res.paginationResults = {
            data,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
        };

        next();
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = paginationMiddleware;
