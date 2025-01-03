const { Signup } = require('../Controllers/Auth');
const {
    CategoryController,
    ProductController,
    OrderController,
    ReviewController,
    PaymentController,
    getProductById,
    SellerOrders
} = require('../Controllers/GetController');
const router = require("express").Router();
const {UsersController} = require('../Controllers/UserController');
const {CartController} = require('../Controllers/CartController')

// Route for fetching users
router.post('/users', UsersController);

// Route for fetching categories
router.get('/categories', CategoryController);

// Route for fetching products
router.get('/products', ProductController);

// Route for fetching products
router.post('/GetproductById', getProductById);

// Route for fetching orders
router.get('/orders', OrderController);

// Route for fetching reviews
router.post('/reviews', ReviewController);

// Route for fetching carts
router.get('/carts', CartController);

// Route for fetching payments
router.get('/payments', PaymentController);

router.get('/')


module.exports = router;