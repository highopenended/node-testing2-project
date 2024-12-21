function validateUser(req, res, next) {
    const { name, email } = req.body;

    if (!name || typeof name !== "string") {
        return res.status(400).json({ message: "Name is required and must be a string" });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: "Valid email is required" });
    }

    next();
}

function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
}

module.exports = { validateUser, errorHandler };
