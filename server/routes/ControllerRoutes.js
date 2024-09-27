const {
    UserController,
    CategoryController,
    ProductController,
    OrderController,
    ReviewController,
    CartController,
    PaymentController
} = require('../Controllers/GetController');
const router = require("express").Router();

console.log("category is ",CategoryController)
// Route for fetching users
router.get('/users', UserController);

// Route for fetching categories
router.get('/categories', CategoryController);

// Route for fetching products
router.get('/products', ProductController);

// Route for fetching orders
router.get('/orders', OrderController);

// Route for fetching reviews
router.get('/reviews', ReviewController);

// Route for fetching carts
router.get('/carts', CartController);

// Route for fetching payments
router.get('/payments', PaymentController);


module.exports = router;