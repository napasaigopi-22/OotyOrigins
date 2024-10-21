const { Signup } = require('../Controllers/Auth');
const {
    UserController,
    CategoryController,
    ProductController,
    OrderController,
    ReviewController,
    CartController,
    PaymentController,
    getProductById
} = require('../Controllers/GetController');
const router = require("express").Router();

// Route for fetching users
router.get('/users', UserController);

// Route for fetching categories
router.get('/categories', CategoryController);

// Route for fetching products
router.get('/products', ProductController);

// Route for fetching products
router.post('/GetproductById', getProductById);

// Route for fetching orders
router.get('/orders', OrderController);

// Route for fetching reviews
router.get('/reviews', ReviewController);

// Route for fetching carts
router.get('/carts', CartController);

// Route for fetching payments
router.get('/payments', PaymentController);


module.exports = router;