const {addProductToCart, showCart, addQuantityToProduct} = require('../Controllers/PostControllers');
const router = require("express").Router();

router.post('/addToCart', addProductToCart);

router.post('/showCart',showCart);

router.post('/addQuantityToProduct',addQuantityToProduct)


module.exports = router;