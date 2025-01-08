const { model } = require("mongoose");
const models = require("../Models/Models");
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Models = require("../Models/Models");
const router = require("../routes/AuthRoutes");

// Add a review for a product
module.exports.addReview = async (req, res) => {
  try {
    var { userId, productId, rating, feedback, comment } = req.body;
    console.log("\n\n\n\n comment is ",comment, "\n\n\n\n");
    if(rating==0)rating=1;

    const existingReview = await models.Review.findOne({ userId, productId });
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this product." });
    }

    const reviewsCount = await models.Review.countDocuments({});
    const newReview = new models.Review({
      userId,
      productId,
      rating,
      comment,
      reviewId: `R${reviewsCount}`
    });

    await newReview.save();
    return res.status(201).json({ message: "Review added successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding review." });
  }
};

module.exports.ReviewRetriew = ('/get/reviews', async (req, res) => {
  try {
    const { productId } = req.query;
    const reviews = await ReviewModel.find({ productId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});


// Fetch reviews for a specified product
module.exports.getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log("productId is ", productId);

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
// Create order
module.exports.CreateOrder = async (req, res) => {
  try {
    const { userId, userAddress, products, totalAmount, paymentMethod } = req.body;


    // Update active status of the user's current active cart
    await models.Cart.updateOne({ userId:userId,isActive:1 }, { isActive: 0 });

    // Create a new order
    const ordersCount = await models.Order.countDocuments({});
    const newOrder = new models.Order({
      orderId: `O${ordersCount+1}`,
      userId,
      products,
      totalAmount,
      status: 'Pending',
      orderDate: new Date(),
      deliveryDate: new Date(),
      paymentMethod,
      shippingAddress: userAddress
    });

    console.log("Order is ",newOrder)

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

    // const password = await models.User.findone({userId:body.userId});
    // Save the updated user object
    body.password=userOBJ.password
    const updateduser = await models.User.updateOne({userId:body.userId},{$set: body});


    return res.json({ message: "User Details Updated" })
  } catch (Error) {
    console.log(Error)
  }
};
