const {CreateOrder, DeliverProduct, verify, addReview, getReviews, UpdateUser} = require('../Controllers/PostControllers');
const router = require("express").Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const { CreateProduct } = require('../Controllers/AddProductController');
const { SellerOrders, OrderController } = require('../Controllers/GetController');

const {deleteUserProfile, editUserProfile, ChangePassword} = require('../Controllers/UserController');
const {addProductToCart, addQuantityToProduct, showCart, deleteProductFromCart} = require('../Controllers/CartController');
const {orderProduct, UpdateProduct} = require('../Controllers/ProductController')


const storageobj = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'Controllers/public/images/');
    },
    filename: function(req, file, cb) { 
        cb(null, file.originalname);
    }
});



let upload = multer({ storage:storageobj });


router.post('/addToCart', addProductToCart);

router.post('/showCart',showCart);

router.post('/addQuantityToProduct',addQuantityToProduct)

router.delete('/deleteProductFromCart',deleteProductFromCart)

router.post('/AddProduct', upload.single('image'), CreateProduct);

router.post('/CreateOrder', CreateOrder);

router.post('/SellerOrders', SellerOrders);

router.post('/DeliverProducts', DeliverProduct);

router.post('/orderproducct', orderProduct);

router.post('/verify', verify);

router.post('/addReview', addReview);

router.get('/reviews/:productId', getReviews);

router.post('/userOrders', OrderController);

router.post('/UpdateUser',UpdateUser);

router.post("/UpdateProduct", UpdateProduct);

router.post("/ChangePassword", ChangePassword)

// router.put('/user/edit/:userId', userController.editUserProfile);


module.exports = router; 