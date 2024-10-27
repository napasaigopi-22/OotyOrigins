const {addProductToCart, showCart, addQuantityToProduct, deleteProductFromCart} = require('../Controllers/PostControllers');
const router = require("express").Router();

router.post('/addToCart', addProductToCart);

router.post('/showCart',showCart);

router.post('/addQuantityToProduct',addQuantityToProduct)

router.delete('/deleteProductFromCart',deleteProductFromCart)


module.exports = router;