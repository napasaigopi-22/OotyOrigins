const models = require("../Models/Models");

// Add a new product to the cart
module.exports.addProductToCart = async (req, res, next) => {
    try {
        const { userId, productId } = req.body;

        // Find active cart for the user
        let cart = await models.Cart.findOne({ isActive: 1, userId });
        const quantity = 1;
        if (cart) {
            // Check if product already exists in the cart
            const existingProduct = cart.products.find(item => item.productId === productId);
            
            if (existingProduct) {
                return res.status(400).json({ message: "Product already exists in the cart. Use update quantity instead." });
            } else {
                
                cart.products.push({ productId, quantity });
                cart.totalAmount += (await models.Product.find({productId:productId}))[0].price * quantity;
                cart.updatedAt = Date.now();

                const updatedCart = await cart.save();
                return res.json(updatedCart);
            }
        } else {
            // Create a new cart for the user if no active cart exists
            const product = await models.Product.find({productId:productId});
            const cartlist = await models.Cart.find({});
            console.log(product[0].price)

            const newCart = new models.Cart({
                cartId:"cart_"+cartlist.length,
                userId:userId,
                products: [{ productId, quantity }],
                totalAmount: product[0].price * quantity,
                isActive: 1
            });
            const savedCart = await newCart.save();
            return res.json(savedCart);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error adding product to cart" });
    }
};

// Add quantity to an existing product in the cart
module.exports.addQuantityToProduct = async (req, res, next) => {
    try {
        const { userId, productId, additionalQuantity } = req.body;

        // Find active cart for the user
        let cart = await models.Cart.findOne({ isActive: 1, userId });

        if (cart) {
            // Find product in the cart
            const productInCart = cart.products.find(item => item.productId === productId);

            if (productInCart) {
                // Update product quantity
                productInCart.quantity += additionalQuantity;
                cart.totalAmount += (await models.Product.findById(productId)).price * additionalQuantity;
                cart.updatedAt = Date.now();

                const updatedCart = await cart.save();
                return res.json(updatedCart);
            } else {
                return res.status(404).json({ message: "Product not found in cart." });
            }
        } else {
            return res.status(404).json({ message: "No active cart found for the user." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating product quantity in cart" });
    }
};

// Update product quantity in the cart
module.exports.updateProductQuantity = async (req, res, next) => {
    try {
        const { userId, productId, newQuantity } = req.body;

        // Find active cart for the user
        let cart = await models.Cart.findOne({ isActive: 1, userId });

        if (cart) {
            // Find product in the cart
            const productInCart = cart.products.find(item => item.productId === productId);

            if (productInCart) {
                // Calculate the price difference
                const productPrice = (await models.Product.findById(productId)).price;
                cart.totalAmount += (newQuantity - productInCart.quantity) * productPrice;

                // Update product quantity
                productInCart.quantity = newQuantity;
                cart.updatedAt = Date.now();

                const updatedCart = await cart.save();
                return res.json(updatedCart);
            } else {
                return res.status(404).json({ message: "Product not found in cart." });
            }
        } else {
            return res.status(404).json({ message: "No active cart found for the user." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating product quantity in cart" });
    }
};

// Delete a product from the cart
module.exports.deleteProductFromCart = async (req, res, next) => {
    try {
        const { userId, productId } = req.body;

        // Find active cart for the user
        let cart = await models.Cart.findOne({ isActive: 1, userId });

        if (cart) {
            // Find the product in the cart
            const productIndex = cart.products.findIndex(item => item.productId === productId);

            if (productIndex !== -1) {
                // Reduce the total amount accordingly
                const productPrice = (await models.Product.findById(productId)).price;
                cart.totalAmount -= cart.products[productIndex].quantity * productPrice;

                // Remove the product from the cart
                cart.products.splice(productIndex, 1);
                cart.updatedAt = Date.now();

                const updatedCart = await cart.save();
                return res.json(updatedCart);
            } else {
                return res.status(404).json({ message: "Product not found in cart." });
            }
        } else {
            return res.status(404).json({ message: "No active cart found for the user." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting product from cart" });
    }
};


// show existing cart
module.exports.showCart = async (req, res, next) => {
    try{
        var cart ={};
        cart = await models.Cart.find({userId:req.body.userId, isActive:1});
        cart = JSON.stringify(cart);
        cart=JSON.parse(cart);
        console.log(typeof cart);
        var prdids=[]
        cart[0].products.map((prd)=>{
            prdids.push(prd.productId);
        });
        let products = await models.Product.find({productId:prdids});
        for(let i=0;i<cart[0].products.length;i++){
            cart[0].products[i].product=products[i];
        };
        console.log(cart[0]);

        
        return res.json(cart);
    } catch(error)
    {
        return res.status(500).json({ message: "Error deleting product from cart" });
    }
}