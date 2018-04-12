/* global api, describe, it, expect, beforeEach */
const { Item } = require('../../../models/item');
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const userData = {
  name: 'testName',
  lastName: 'testLastname',
  username: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test'
};

const itemData = [{
  brand: 'Lanvin',
  shortDescription: 'Blue satin trench coat',
  longDescription: 'Epaulettes, storm flaps, side pockets, belt loops, detachable waist tie, button-fastening cuff tabs, back vent, fully lined',
  retailPrice: 1855,
  rentalPrice: 40,
  category: 'Clothing',
  type: 'JacketsCoats',
  occasion: ['Formal', 'Daytime', 'Work'],
  colors: ['Blue'],
  sizeAvailable: 'M',
  mainImage: 'https://m.hng.io/catalog/product/cache/1/gallery/390x550/0dc2d03fe217f8c83829496872af24a0/6/6/663986_blue_1.jpg',
  smallImages: ['https://m.hng.io/catalog/product/cache/1/gallery/390x550/0dc2d03fe217f8c83829496872af24a0/6/6/663986_blue_5.jpg', 'https://m.hng.io/catalog/product/cache/1/gallery/390x550/0dc2d03fe217f8c83829496872af24a0/6/6/663986_blue_4.jpg', 'https://m.hng.io/catalog/product/cache/1/gallery/390x550/0dc2d03fe217f8c83829496872af24a0/6/6/663986_blue_3.jpg'],
  available: true,
  reviews: []
}, {
  brand: 'Self-Portrait',
  shortDescription: 'Navy embroidered tulle maxi dress',
  longDescription: 'Textured, embroidered, black grosgrain tie-fastening shoulders, metallic weave, wrap-effect front, lace insert at waist, pleated, tiered, almond lining',
  retailPrice: 390,
  rentalPrice: 25,
  category: 'Clothing',
  type: 'Dresses',
  occasion: ['Formal', 'Party'],
  colors: ['Navy', 'Blue'],
  sizeAvailable: 'M',
  mainImage: 'https://m.hng.io/catalog/product/6/6/665878_navy_and_other_4.jpg',
  smallImages: ['https://m.hng.io/catalog/product/cache/1/gallery/390x550/0dc2d03fe217f8c83829496872af24a0/6/6/665878_navy_and_other_5.jpg', 'https://m.hng.io/catalog/product/cache/1/gallery/390x550/0dc2d03fe217f8c83829496872af24a0/6/6/665878_navy_and_other_2.jpg',  'https://m.hng.io/catalog/product/cache/1/gallery/390x550/0dc2d03fe217f8c83829496872af24a0/6/6/665878_navy_and_other_3.jpg'],
  available: true,
  reviews: []
}];

let token = '';
let dataOrder = {};

describe('POST /api/orders - might fail if payment takes too long', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Item.remove({})
    ])
    //user needs to be authenticated before it can access content of cart
      .then(() => Promise.props({
        items: Item.create(itemData),
        user: User.create(userData)
      }))
      .then(data => {
        //sign in user and create token
        token = jwt.sign({ sub: data.user._id }, secret, { expiresIn: '5m' });
        //push 2 items _id into the cart
        data.user.cart.push(data.items[0]._id);
        data.user.cart.push(data.items[1]._id);
        data.user.save();

        //use test card token provided by stripe
        dataOrder = {
          token: 'tok_gb_debit', //test token provided by Stripe
          amount: 100,
          currency: 'gbp',
          payee: 'test',
          UserEmail: 'test@test.com',
          errors: {},
          errorPayment: '',
          orderTotal: 100,
          deliveryBillingAddress: '114 Whitechapel High St, London E1 7PT',
          deliveryBillingPostcode: 'E1 7PT',
          deliveryBillingCity: 'London'
        };
      })
      .then(done);
  });

  it('should return a 401 - unauthorized - response if no token', done => {
    api
      .post('/api/orders')
      .send(dataOrder)
      .expect(401, done);
  });

  it('should return a 200 response if token is provided', done => {
    api
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(dataOrder)
      .expect(200, done);
  });

  it('should return the updated user order with an empty cart and an order array with items', done => {
    api
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(dataOrder)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.cart).to.deep.eq([]);
        expect(res.body.orders).to.be.an('array');
        expect(res.body.orders.length).to.equal(1); //1 order added to orders array
        res.body.orders.forEach(order => {
          expect(order).to.include.keys([
            'UserEmail',
            '_id',
            'amount',
            'createdAt',
            'currency',
            'deliveryBillingAddress',
            'deliveryBillingCity',
            'deliveryBillingPostcode',
            'orderList',
            'payee',
            'token',
            'updatedAt'
          ]);
        });
        done();
      });
  });
});
