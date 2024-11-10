const { model } = require("mongoose");
const models = require("../Models/Models");
const Razorpay = require('razorpay');
const crypto = require('crypto'); // Also ensure crypto is required for generating the receipt ID


// Add a review for a product
module.exports.addReview = async (req, res, next) => {
    try {
        
        const { userId, productId, rating, feedback } = req.body;
        console.log(req.body);

        // Check if the user has already reviewed this product
        const existingReview = await models.Review.findOne({ userId:userId, productId:productId });
        if (existingReview) {
            return res.status(400).json({ message: "You have already reviewed this product." });
        }

        const reviews = await models.Review.find({});
        

        // Create a new review
        const newReview = new models.Review({
            userId,
            productId,
            rating,
            feedback,
            reviewId :"R"+reviews.length 
        });

        await newReview.save();
        return res.status(201).json({ message: "Review added successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error adding review." });
    }
};


module.exports.getReviews = async (req, res, next) => {
    try {
        const { productId } = req.params; // Retrieve productId from URL parameters

        // Fetch reviews for the specified product
        const reviews = await reviews.find({ productId }).populate('userId', 'name'); // Populate userName to display reviewer's name

        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this product." });
        }

        return res.json(reviews); // Send the reviews as the response
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching reviews." });
    }
};


// Add a new product to the cart
module.exports.addProductToCart = async (req, res, next) => {
    console.log("add to cart is ===111```",req)
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
                cart.totalAmount += (await models.Product.find({ productId: productId }))[0].price * quantity;
                cart.updatedAt = Date.now();

                const updatedCart = await cart.save();
                return res.json(updatedCart);
            }
        } else {
            // Create a new cart for the user if no active cart exists
            const product = await models.Product.find({ productId: productId });
            const cartlist = await models.Cart.find({});

            const newCart = new models.Cart({
                cartId: "cart_" + cartlist.length,
                userId: userId,
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
                const PrdIndx = cart.products.findIndex(item => item.productId === productId);
                if (productInCart.quantity <= 0)
                    cart.products.splice(PrdIndx, 1);
                cart.totalAmount += (await models.Product.find({ productId: productId }))[0].price * additionalQuantity;
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
        let cart = await models.Cart.findOne({ isActive: 1, userId: userId });
        var product;
        if (cart) {
            // Find the product in the cart
            const productIndex = cart.products.findIndex(item => item.productId === productId);

            if (productIndex !== -1) {
                // Reduce the total amount accordingly
                product = (await models.Product.find({ productId: productId }))[0];
                const productPrice = product.price;
                cart.totalAmount -= cart.products[productIndex].quantity * productPrice;

                // Remove the product from the cart
                cart.products.splice(productIndex, 1);
                cart.updatedAt = Date.now();

                if (cart.products.length == 0)
                    cart.isActive = 0;

                const updatedCart = await cart.save();


                return res.json({ "updatedCart": updatedCart, "deleted": product });
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
    console.log("req.body is ",req.body)
    try {
        var cart = {};
        cart = await models.Cart.find({ userId: req.body.userId, isActive: 1 });
        const cartWithSellerAddress = await models.Cart.aggregate([
            { $match: { userId: req.body.userId, isActive: 1 } }, // Filter cart by userId and active status
            {
              $lookup: {
                from: 'products', // Collection name of Product
                localField: 'products.productId', // Field in Cart to match
                foreignField: 'productId', // Field in Product to match
                as: 'productDetails' // Name for the output array
              }
            },
            {
              $lookup: {
                from: 'users', // Collection name of User
                localField: 'productDetails.uploadedBy', // Field in Product to match
                foreignField: 'userId', // Field in User to match
                as: 'sellerDetails' // Name for the seller's details array
              }
            },
            {
              $addFields: {
                products: {
                  $map: {
                    input: '$products',
                    as: 'cartProduct',
                    in: {
                      $mergeObjects: [
                        '$$cartProduct',
                        {
                          $arrayElemAt: [
                            {
                              $map: {
                                input: {
                                  $filter: {
                                    input: '$productDetails',
                                    as: 'productDetail',
                                    cond: { $eq: ['$$productDetail.productId', '$$cartProduct.productId'] }
                                  }
                                },
                                as: 'productWithSeller',
                                in: {
                                  $mergeObjects: [
                                    '$$productWithSeller',
                                    {
                                      sellerAddress: {
                                        $arrayElemAt: [
                                          {
                                            $map: {
                                              input: {
                                                $filter: {
                                                  input: '$sellerDetails',
                                                  as: 'seller',
                                                  cond: { $eq: ['$$seller.userId', '$$productWithSeller.uploadedBy'] }
                                                }
                                              },
                                              as: 'sellerData',
                                              in: '$$sellerData.address'
                                            }
                                          },
                                          0
                                        ]
                                      }
                                    }
                                  ]
                                }
                              }
                            },
                            0
                          ]
                        }
                      ]
                    }
                  }
                }
              }
            },
            { $project: { productDetails: 0, sellerDetails: 0 } } // Remove intermediate arrays
          ]);
          
          console.log(JSON.stringify(cartWithSellerAddress, null, 2));
        return res.json(cartWithSellerAddress);
    } catch (error) {
        return res.status(500).json({ message: "Error showing product from cart" });
    }
}

module.exports.CreateOrder = async (req, res, next) => {
    try {
        console.log(req.body);
        const element = req.body;
        const userId = req.body.userId;
        const userAddress = req.body.userAddress;
        var prdSeller = [];
        const filter = { cartId:req.body.cartId};
        const update = { isActive:0 };
        const car = await models.Cart.findOneAndUpdate(filter,update);
        console.log("cart after updating is ",await models.Cart.find({cartId:req.body.cartId}),"  ",car);
        for (var i = 0; i < req.body.products.length; i++) {
            var obj = {};
            console.log(element.products[i]);
            obj = { uploadedBy: element.products[i].product.uploadedBy, ProductDetails: { productId: element.products[i].productId, ProduQuantity: element.products[i].quantity } };
            prdSeller.push(obj);
        }
        const ordersExisting = await models.Order.find({});
        const orderslength=ordersExisting.length;
        const order = await models.Order({
            orderId: 'O'+orderslength,
            userId: userId,
            products: req.body.products,
            totalAmount: req.body.totalAmount,
            status: 'Pending',
            orderDate: new Date(),
            deliveryDate: new Date(),
            paymentMethod: req.body.paymentMethod,
            shippingAddress: userAddress
        });
        console.log("orders=",req.body);
        order.save();
        //send data to uploadedBy
        return res.json(order)
    } catch (error) {
        console.log(error);
    }
}

module.exports.DeliverProduct = async (req,res,next) => {
    try{
        const order = (await models.Order.find({orderId:req.body.orderId}))[0];
        console.log("order is =",order);
        order.status='Delivered';
        order.save();
        return res.json(order);
    } catch(error)
    {
        console.log(error);
    }
}

module.exports.orderProduct = async(req,res) => {
    try {
        console.log(req.body);
        const instance = new Razorpay({
            key_id: "rzp_test_iXe4dbs084fBfw",
            key_secret: "mi71dTQlL2UdN3KqM5dAYYKy",
        });

        const options = {
            amount: req.body.amount,
            currency:"INR",
            receipt:crypto.randomBytes(10).toString("hex"),
        }
        instance.orders.create(options,(error,order) => {
            if(error) {
                console.log(error);
                return res.status(500).json({message:"Something Went Wrong!"});
            }
            res.status(200).json({data:order});
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error!"});
    }

};

//Verifying the payment
module.exports.verify = async(req,res) => {
    try {
        const {
            razorpay_orderID,
            razorpay_paymentID,
            razorpay_signature } = req.body;
        const sign = razorpay_orderID + "|" + razorpay_paymentID;
        const resultSign = crypto
        .createHmac("sha256",process.env.KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

        if (razorpay_signature == resultSign){
            return res.status(200).json({message:"Payment verified successfully"});
        }

    } catch(error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error!"});
    }
};