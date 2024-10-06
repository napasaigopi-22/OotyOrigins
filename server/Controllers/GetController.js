const models = require("../Models/Models");

module.exports.UserController = async (req, res, next) => {
    try {
        const listOfUsers = await models.User.find({});
        return res.json(listOfUsers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching users" });
    }
};

// Category Controller
module.exports.CategoryController = async (req, res, next) => {
    try {
        const listOfCategories = await models.Category.find({});
        return res.json(listOfCategories);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching categories" });
    }
};

// Product Controller
module.exports.ProductController = async (req, res, next) => {
    try {
        const listOfProducts = await models.Product.find({});
        return res.json(listOfProducts);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching products" });
    }
};

// Order Controller
module.exports.OrderController = async (req, res, next) => {
    try {
        const listOfOrders = await models.Order.find({});
        return res.json(listOfOrders);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching orders" });
    }
};

// Review Controller
module.exports.ReviewController = async (req, res, next) => {
    try {
        const listOfReviews = await models.Review.find({});
        return res.json(listOfReviews);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching reviews" });
    }
};

// Cart Controller
module.exports.CartController = async (req, res, next) => {
    try {
        const listOfCarts = await models.Cart.find({});
        return res.json(listOfCarts);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching carts" });
    }
};

// Payment Controller
module.exports.PaymentController = async (req, res, next) => {
    try {
        const listOfPayments = await models.Payment.find({});
        return res.json(listOfPayments);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching payments" });
    }
};
