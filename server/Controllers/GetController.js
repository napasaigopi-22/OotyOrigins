const models = require("../Models/Models");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

module.exports.UsersController = async (req, res, next) => {
    try {
        const listOfUsers = await models.User.find({username:req.body.username});
        console.log(req.body.username,listOfUsers)
        return res.json(listOfUsers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching users" });
    }
};

// GET Route to Fetch User Details
module.exports.getUser= async (req, res) => {
    try {
      console.log('Fetching user with ID:', req.params.id);
      const user = await userModel.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Category Controller
module.exports.CategoryController = async (req, res, next) => {
    try {
        const listOfCategories = await models.Category.find({});
        return res.json(listOfCategories);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching categories" });
    }
};

// Product Controller
module.exports.ProductController = async (req, res, next) => {
    try {
        const listOfProducts = await models.Product.find({});
        return res.json(listOfProducts);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching products" });
    }
};

module.exports.getProductById = async (req, res) => {
    try {
        const productId = req.body.id;
        const product = await models.Product.find({ productId: productId });
        console.log(productId, product[0])

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.json(product);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching product" });
    }
};


// Order Controller
module.exports.OrderController = async (req, res, next) => {
    
    try {
        const listOfOrders = await models.Order.find({userId:req.body.userId});
        const user = await models.User.findOne({ userId: req.body.userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userId = user.userId; 
        console.log("in orders controlelr",listOfOrders)
        const orders = await models.Order.aggregate([
            { $match: { userId: req.body.userId } }, // Filter orders by userId
            {
              $lookup: {
                from: 'products', // Collection name of Product
                localField: 'products.productId', // Field in Order to match
                foreignField: 'productId', // Field in Product to match
                as: 'productDetails' // Name for the output array
              }
            },
            {
              $lookup: {
                from: 'users', // Collection name of User
                localField: 'productDetails.uploadedBy', // Field in Product to match
                foreignField: 'userId', // Field in User to match
                as: 'uploaderDetails' // Name for the output array
              }
            },
            {
              $lookup: {
                from: 'users', // Collection name of User
                localField: 'userId', // Field in Order to match
                foreignField: 'userId', // Field in User to match
                as: 'userDetails' // Name for the user who placed the order
              }
            },
            {
              $addFields: {
                username: { $arrayElemAt: ['$userDetails.username', 0] }, // Add username of the ordering user
                products: {
                  $map: {
                    input: '$products',
                    as: 'orderProduct',
                    in: {
                      $mergeObjects: [
                        '$$orderProduct',
                        {
                          $arrayElemAt: [
                            {
                              $map: {
                                input: {
                                  $filter: {
                                    input: '$productDetails',
                                    as: 'productDetail',
                                    cond: { $eq: ['$$productDetail.productId', '$$orderProduct.productId'] }
                                  }
                                },
                                as: 'productWithUploader',
                                in: {
                                  $mergeObjects: [
                                    '$$productWithUploader',
                                    {
                                      uploaderAddress: {
                                        $arrayElemAt: [
                                          {
                                            $map: {
                                              input: {
                                                $filter: {
                                                  input: '$uploaderDetails',
                                                  as: 'uploader',
                                                  cond: { $eq: ['$$uploader.userId', '$$productWithUploader.uploadedBy'] }
                                                }
                                              },
                                              as: 'uploaderData',
                                              in: '$$uploaderData.address'
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
            { $project: { productDetails: 0, uploaderDetails: 0, userDetails: 0 } } // Remove intermediate arrays
          ]);
          
          console.log(JSON.stringify(orders, null, 2));
        return res.json(orders);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching orders" });
    }
};

// Review Controller
module.exports.ReviewController = async (req, res, next) => {
    try {
        const listOfReviews = await models.Review.find({});
        return res.json(listOfReviews);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching reviews" });
    }
};

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

// Payment Controller
module.exports.PaymentController = async (req, res, next) => {
    try {
        const listOfPayments = await models.Payment.find({});
        return res.json(listOfPayments);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching payments" });
    }
};

module.exports.SellerOrders = async (req, res, next) => {
    try {
        var values0 = await models.Order.find({});
        var values = [...values0];
        var sellerProducts = await models.Product.find({ "uploadedBy": req.body.userId });
        var sellerPrdtsPID = [];
        sellerProducts.forEach(ele => {
            sellerPrdtsPID.push(ele.productId)
        });
        var sellersOrders = [];
        for (var j = 0; j < values.length; j++) {
            for (var i = 0; i < values[j].products.length; i++) {
                if (sellerPrdtsPID.indexOf(values[j].products[i].productId) != -1) {
                    var user = await models.User.find({ userId: values[j].userId });
                    var temp;
                    temp = values[j].toJSON();
                    temp.username = user[0].username;
                    sellersOrders.push(temp);
                    break;
                }
            }
        };
        var proudctJSON = {};
        var products = [];
        for (var i = 0; i < sellersOrders.length; i++) {
            var tempprdct = [];

            sellersOrders[i].products.forEach((i) => {
                sellerProducts.forEach(element => {
                    var e = element.toObject();
                    e.quantity = i.quantity;
                    if (element.productId == i.productId) tempprdct.push(e);
                });
            });
            products.push(tempprdct);
        }
        proudctJSON = sellersOrders;
        for (var i = 0; i < proudctJSON.length; i++) {
            proudctJSON[i]['products'] = products[i];
        }

        return res.json(proudctJSON);
    } catch (error) {
        console.log(error)
    }
}
