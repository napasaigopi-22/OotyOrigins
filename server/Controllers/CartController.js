const models = require("../Models/Models");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');


// Cart Controller
module.exports.CartController = async (req, res, next) => {
    try {
        const listOfCarts = await models.Cart.find({});
        return res.json(listOfCarts);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching carts" });
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

      const productPrice = (await models.Product.find({productId:productId}))[0].price;
      cart.products.push({ productId, quantity: 1 });
      cart.totalAmount += productPrice;
      cart.updatedAt = Date.now();

      const updatedCart = await cart.save();
      return res.json(updatedCart);
    } else {
      const productPrice = (await models.Product.find({productId:productId}))[0].price;
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

    const productPrice = (await models.Product.find({productId:productId}))[0].price;
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

    const productPrice = (await models.Product.find({productId:productId}))[0].price;

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
// show existing cart
module.exports.showCart = async (req, res, next) => {
  // console.log("req.body is ", req.body);
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


    return res.json(cartWithSellerAddress);
  } catch (error) {
    return res.status(500).json({ message: "Error showing product from cart" });
  }
}