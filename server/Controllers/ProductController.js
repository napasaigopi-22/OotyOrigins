const { model } = require("mongoose");
const models = require("../Models/Models");
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Models = require("../Models/Models");

module.exports.UpdateProduct = async (req, res, next) => {
  try {
    // console.log(req.body)
    const { productId } = req.body; // Extract productId from request parameters
    // console.log(productId);
    const updateData = req.body; // Data to update, assumed to be in the request body

    // Find the product by productId and update with the provided data
    const updatedProduct = await models.Product.findOneAndUpdate(
      { productId: productId }, // Filter by productId
      { $set: updateData }, // Update with data from the request body
      { new: true } // Option to return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Send the updated product data as response
    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
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