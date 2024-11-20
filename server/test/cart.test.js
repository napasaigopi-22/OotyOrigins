const request = require('supertest');
const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;
const app = require('../server'); // Assuming the Express app is exported from 'app.js'

const models = require('../Models/Models'); // Replace with the actual location of your models

describe('POST /addToCart', () => {
  let product, cart;

  // Create product and cart before tests
//   beforeEach(async () => {
//     // Create a mock product
//     product = new models.Product({
//       productId: "12345",
//       name: "Test Product",
//       price: 100,
//     });
//     // await product.save();

//     // Create a mock cart for a user
//     cart = new models.Cart({
//       cartId: `cart_1`,
//       userId: "user_1",
//       products: [],
//       totalAmount: 0,
//       isActive: 1,
//     });
//     // await cart.save();
//   });

//   // Clean up after tests
//   afterEach(async () => {
//     await models.Cart.deleteMany({});
//     await models.Product.deleteMany({});
//   });

  // Test adding a product to an existing cart
  it('should add a product to an existing cart', async () => {
    const payload = {
      userId: "user_1",
      productId: product.productId,
    };

    const res = await request(app)
      .post('/addToCart')
      .send(payload);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('cartId');
    expect(res.body.products).to.have.lengthOf(1);
    expect(res.body.products[0]).to.have.property('productId', product.productId);
    expect(res.body.totalAmount).to.equal(product.price);
  });

  // Test adding the same product again (should return 400)
  it('should return 400 if the product already exists in the cart', async () => {
    // Add product once
    const payload1 = {
      userId: "user_1",
      productId: product.productId,
    };
    await request(app)
      .post('/addToCart')
      .send(payload1);

    // Try adding the same product again
    const payload2 = {
      userId: "user_1",
      productId: product.productId,
    };

    const res = await request(app)
      .post('/addToCart')
      .send(payload2);

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('Product already exists in the cart. Use update quantity instead.');
  });

  // Test creating a new cart for a user
  it('should create a new cart if no active cart exists', async () => {
    const payload = {
      userId: "user_2", // Assuming user_2 doesn't have an active cart
      productId: product.productId,
    };

    const res = await request(app)
      .post('/addToCart')
      .send(payload);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('cartId');
    expect(res.body.products).to.have.lengthOf(1);
    expect(res.body.products[0]).to.have.property('productId', product.productId);
    expect(res.body.totalAmount).to.equal(product.price);
  });

  // Test handling a server error (mocking models)
  it('should return 500 if there is a database error', async () => {
    // Spy on the Cart model and simulate an error
    const findOneStub = sinon.stub(models.Cart, 'findOne').throws(new Error("Database error"));

    const payload = {
      userId: "user_1",
      productId: product.productId,
    };

    const res = await request(app)
      .post('/addToCart')
      .send(payload);

    expect(res.status).to.equal(500);
    expect(res.body.message).to.equal("Error adding product to cart");

    // Restore the original method after the test
    findOneStub.restore();
  });
});
