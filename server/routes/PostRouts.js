const {addProductToCart, showCart, addQuantityToProduct, deleteProductFromCart, CreateOrder, DeliverProduct, orderProduct, verify, addReview, getReviews} = require('../Controllers/PostControllers');
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

<<<<<<< HEAD
router.post('/addReview', addReview);

router.get('/reviews/:productId', getReviews);
=======
router.post('/userOrders', OrderController);
>>>>>>> 44fd2d266777a2692b830a4bdf5bdcb40f5a6a10

module.exports = router; 