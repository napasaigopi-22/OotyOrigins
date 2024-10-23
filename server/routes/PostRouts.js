const {addProductToCart, showCart} = require('../Controllers/PostControllers');
const router = require("express").Router();

router.post('/addToCart', addProductToCart);

router.post('/showCart',showCart);


module.exports = router;