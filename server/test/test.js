import request from 'supertest';
import { expect as _expect } from 'chai';
import { stub, restore } from 'sinon';
// import mongoose from 'mongoose';
import app from '../server'; // Ensure the app is exported from server.js
import { Cart, Product, Review, Order } from '../Models/Models'; // Include your models if needed

const expect = _expect;

describe('API Endpoints', () => {
  let mockCart, mockProduct;

  beforeEach(() => {
    mockCart = stub(Cart, 'findOne');
    mockProduct = stub(Product, 'find');
  });

  afterEach(() => {
    restore();
  });

  describe('POST /post/addToCart', () => {
    it('should add a product to the cart', async () => {
      // Mock database response
      const mockCartData = {
        isActive: 1,
        userId: '123',
        products: [],
        totalAmount: 0,
        save: stub().resolves(),
      };
      mockCart.resolves(mockCartData);
      mockProduct.resolves([{ productId: 'p1', price: 100 }]);

      const res = await request(app)
        .post('/post/addToCart')
        .send({ userId: '123', productId: 'p1' });

      expect(res.status).to.equal(200);
      expect(res.body.totalAmount).to.equal(100);
    });
  });

  describe('POST /post/showCart', () => {
    it('should retrieve the cart for a user', async () => {
      const mockCartData = [{
        userId: '123',
        products: [{ productId: 'p1', quantity: 2 }],
        totalAmount: 200,
        isActive: 1,
      }];
      stub(Cart, 'aggregate').resolves(mockCartData);

      const res = await request(app)
        .post('/post/showCart')
        .send({ userId: '123' });

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0].totalAmount).to.equal(200);
    });
  });

  describe('GET /post/reviews/:productId', () => {
    it('should fetch reviews for a product', async () => {
      const mockReviews = [
        { userId: 'u1', productId: 'p1', rating: 5, feedback: 'Great product!' },
      ];
      stub(Review, 'find').resolves(mockReviews);

      const res = await request(app).get('/post/reviews/p1');

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0].rating).to.equal(5);
    });
  });

  describe('POST /post/CreateOrder', () => {
    it('should create an order successfully', async () => {
      const mockOrder = {
        orderId: 'O1',
        userId: '123',
        products: [{ productId: 'p1', quantity: 1 }],
        totalAmount: 200,
        status: 'Pending',
      };
      stub(Order, 'create').resolves(mockOrder);

      const res = await request(app)
        .post('/post/CreateOrder')
        .send({
          userId: '123',
          products: [{ productId: 'p1', quantity: 1 }],
          totalAmount: 200,
          paymentMethod: 'COD',
        });

      expect(res.status).to.equal(200);
      expect(res.body.orderId).to.equal('O1');
    });
  });
});
