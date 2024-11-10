const { model } = require("mongoose");
const models = require("../Models/Models");
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Models = require("../Models/Models");

// Controller to handle editing user profile
exports.editUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;

    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true, runValidators: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

// Add a review for a product
module.exports.addReview = async (req, res) => {
  try {
    const { userId, productId, rating, feedback } = req.body;

    const existingReview = await models.Review.findOne({ userId, productId });
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this product." });
    }

    const reviewsCount = await models.Review.countDocuments({});
    const newReview = new models.Review({
      userId,
      productId,
      rating,
      feedback,
      reviewId: `R${reviewsCount}`
    });

    await newReview.save();
    return res.status(201).json({ message: "Review added successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding review." });
  }
};

// Fetch reviews for a specified product
module.exports.getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await models.Review.find({ productId }).populate('userId', 'name');

    if (!reviews.length) {
      return res.status(404).json({ message: "No reviews found for this product." });
    }
    return res.json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching reviews." });
  }
};

// Add product to cart
module.exports.addProductToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await models.Cart.findOne({ isActive: 1, userId });

    if (cart) {
      const existingProduct = cart.products.find(item => item.productId === productId);
      if (existingProduct) {
        return res.status(400).json({ message: "Product already exists in the cart. Use update quantity instead." });
      }

      const productPrice = (await models.Product.findById(productId)).price;
      cart.products.push({ productId, quantity: 1 });
      cart.totalAmount += productPrice;
      cart.updatedAt = Date.now();

      const updatedCart = await cart.save();
      return res.json(updatedCart);
    } else {
      const productPrice = (await models.Product.findById(productId)).price;
      const newCart = new models.Cart({
        cartId: `cart_${await models.Cart.countDocuments({})}`,
        userId,
        products: [{ productId, quantity: 1 }],
        totalAmount: productPrice,
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
module.exports.addQuantityToProduct = async (req, res) => {
  try {
    const { userId, productId, additionalQuantity } = req.body;

    let cart = await models.Cart.findOne({ isActive: 1, userId:userId });

    if (!cart) {
      return res.status(404).json({ message: "No active cart found for the user." });
    }

    const productInCart = cart.products.find(item => item.productId === productId);

    if (!productInCart) {
      return res.status(404).json({ message: "Product not found in cart." });
    }

    productInCart.quantity += additionalQuantity;

    if (productInCart.quantity <= 0) {
      cart.products.splice(cart.products.indexOf(productInCart), 1);
    }

    const productPrice = (await models.Product.find({productId:productId}))[0].price;

    cart.totalAmount += productPrice * additionalQuantity;

    cart.updatedAt = Date.now();

    const updatedCart = await cart.save();

    return res.json(updatedCart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating product quantity in cart" });
  }
};

// Update product quantity in the cart
module.exports.updateProductQuantity = async (req, res) => {
  try {
    const { userId, productId, newQuantity } = req.body;

    let cart = await models.Cart.findOne({ isActive: 1, userId });

    if (!cart) {
      return res.status(404).json({ message: "No active cart found for the user." });
    }

    const productInCart = cart.products.find(item => item.productId === productId);

    if (!productInCart) {
      return res.status(404).json({ message: "Product not found in cart." });
    }

    const productPrice = (await models.Product.findById(productId)).price;
    cart.totalAmount += (newQuantity - productInCart.quantity) * productPrice;

    productInCart.quantity = newQuantity;
    cart.updatedAt = Date.now();

    const updatedCart = await cart.save();

    return res.json(updatedCart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating product quantity in cart" });
  }
};

// Delete a product from the cart
module.exports.deleteProductFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await models.Cart.findOne({ isActive: 1, userId });

    if (!cart) {
      return res.status(404).json({ message: "No active cart found for the user." });
    }

    const productIndex = cart.products.findIndex(item => item.productId === productId);

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart." });
    }

    const productPrice = (await models.Product.findById(productId)).price;

    cart.totalAmount -= cart.products[productIndex].quantity * productPrice;

    cart.products.splice(productIndex, 1);

    if (!cart.products.length) {
      cart.isActive = 0; // Deactivate the cart if empty
    }

    const updatedCart = await cart.save();

    return res.json(updatedCart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting product from cart" });
  }
};

// Show existing cart
// show existing cart
module.exports.showCart = async (req, res, next) => {
  console.log("req.body is ", req.body);
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
        $lookup: {
          from: 'users', // Collection name of User to get user's address
          localField: 'userId', // Field in Cart to match userId
          foreignField: 'userId', // Field in User collection to match
          as: 'userAddressDetails' // Name for the user's address array
        }
      },
      {
        $addFields: {
          userAddress: { $arrayElemAt: ['$userAddressDetails.address', 0] }, // Add user address directly
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
      { $project: { productDetails: 0, sellerDetails: 0, userAddressDetails: 0 } } // Remove intermediate arrays
    ]);


    // console.log(JSON.stringify(cartWithSellerAddress, null, 2));
    return res.json(cartWithSellerAddress);
  } catch (error) {
    return res.status(500).json({ message: "Error showing product from cart" });
  }
}


// Create order
module.exports.CreateOrder = async (req, res) => {
  try {
    const { userId, userAddress, products, totalAmount, paymentMethod } = req.body;

    console.log("User Address:", userAddress);

    // Update active status of the user's current active cart
    await models.Cart.updateOne({ userId:userId }, { isActive: 0 });

    // Create a new order
    const ordersCount = await models.Order.countDocuments({});
    const newOrder = new models.Order({
      orderId: `O${ordersCount}`,
      userId,
      products,
      totalAmount,
      status: 'Pending',
      orderDate: new Date(),
      deliveryDate: new Date(),
      paymentMethod,
      shippingAddress: userAddress
    });

    await newOrder.save();

    // Respond with the created order
    return res.json(newOrder);

  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Deliver Product
module.exports.DeliverProduct = async (req, res) => {
  try {
    const order = await models.Order.findOne({ orderId: req.body.orderId });

    if (order) {
      order.status = 'Delivered';
      await order.save();
      return res.json(order);
    } else {
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

// Order Product
module.exports.orderProduct = async (req, res) => {
  try {
    console.log(req.body);

    const instance = new Razorpay({
      key_id: "rzp_test_iXe4dbs084fBfw",
      key_secret: "mi71dTQlL2UdN3KqM5dAYYKy",
    });

    const options = {
      amount: req.body.amount,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

// Verifying the payment
module.exports.verify = async (req, res) => {
  try {
    const { razorpay_orderID, razorpay_paymentID, razorpay_signature } = req.body;

    // Generate signature for verification
    const sign = `${razorpay_orderID}|${razorpay_paymentID}`;

    // Verify signature using HMAC SHA256
    const resultSign = crypto.createHmac("sha256", process.env.KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (razorpay_signature === resultSign) {
      return res.status(200).json({ message: "Payment verified successfully" });
    }

    return res.status(400).json({ message: "Payment verification failed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports.UpdateUser = async (req, res) => {
  try {
    const body = req.body;
    // console.log("body is ", body.userId);
    const userOBJ = await models.User.find({ userId: body.userId });

    // Update the updatedAt field
    userOBJ.updatedAt = new Date();

    // Save the updated user object
    const updateduser = await models.User.updateOne({userId:body.userId},{$set: body});
    console.log("userobj is ", updateduser)


    return res.json({ message: "lvangam" })
  } catch (Error) {
    console.log(Error)
  }
}