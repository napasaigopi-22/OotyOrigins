const mongoose = require('mongoose');

// 1. Users Collection Schema
const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true }
  },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// 2. Products Collection Schema
const productSchema = new mongoose.Schema({
  productId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  images: [{ type: String }], // Array of image URLs
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// 3. Orders Collection Schema
const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true, required: true },
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date },
  paymentMethod: { type: String, enum: ['Offline', 'Online'], required: true },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true }
  }
});

// 4. Categories Collection Schema
const categorySchema = new mongoose.Schema({
  categoryId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// 5. Reviews Collection Schema
const reviewSchema = new mongoose.Schema({
  reviewId: { type: String, unique: true, required: true },
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// 6. Cart Collection Schema
const cartSchema = new mongoose.Schema({
  cartId: { type: String, unique: true, required: true },
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true }
    }
  ],  
  isActive : { type : Number, required : true},
  totalAmount: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now }
});

// 7. Payment Collection Schema
const paymentSchema = new mongoose.Schema({
  paymentId: { type: String, unique: true, required: true },
  orderId: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentMethod: { type: String, enum: ['Offline', 'Online'], required: true },
  status: { type: String, enum: ['Completed', 'Failed'], default: 'Completed' }
});

// Exporting the models
module.exports = {
  User: mongoose.model('User', userSchema),
  Product: mongoose.model('Product', productSchema),
  Order: mongoose.model('Order', orderSchema),
  Category: mongoose.model('Category', categorySchema),
  Review: mongoose.model('Review', reviewSchema),
  Cart: mongoose.model('Cart', cartSchema),
  Payment: mongoose.model('Payment', paymentSchema)
};
