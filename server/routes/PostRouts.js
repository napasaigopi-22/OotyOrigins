const {addProductToCart, showCart, addQuantityToProduct, deleteProductFromCart, CreateOrder, DeliverProduct, orderProduct, verify, addReview, getReviews, UpdateUser, UpdateProduct} = require('../Controllers/PostControllers');
const router = require("express").Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const { CreateProduct } = require('../Controllers/AddProductController');
const { SellerOrders, OrderController } = require('../Controllers/GetController');


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

// router.put('/user/edit/:userId', userController.editUserProfile);


module.exports = router; 