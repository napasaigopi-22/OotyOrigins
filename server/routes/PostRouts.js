const {addProductToCart, showCart, addQuantityToProduct, deleteProductFromCart, CreateOrder} = require('../Controllers/PostControllers');
const router = require("express").Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const { CreateProduct } = require('../Controllers/AddProductController');

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


module.exports = router;