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

const itemData = {
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
};

let itemId = '';
let reviewData = {};
let token = '';

describe('POST /items/:id/reviews', () => {
  beforeEach(done => {
    Promise.all([
      Item.remove({}),
      User.remove({})
    ])
      .then(() => Promise.props({
        item: Item.create(itemData),
        user: User.create(userData)
      }))
      .then(data => {
        //sign in user and create token
        token = jwt.sign({ sub: data.user._id }, secret, { expiresIn: '5m' });
        //get item id
        itemId = data.item._id;
        //set review data
        reviewData = {
          maintitle: 'loved this coat',
          content: 'amazing coat - great for a special event'
        };
      })
      .then(done);
  });

  it('should return a 401 - unauthorized - response if no token', done => {
    api
      .post(`/api/items/${itemId}/reviews`)
      .send(reviewData)
      .expect(401, done);
  });

  it('should return a 200 response', done => {
    api
      .post(`/api/items/${itemId}/reviews`)
      .set('Authorization', `Bearer ${token}`)
      .send(reviewData)
      .expect(200, done);
  });

  it('should return an item with a reviews array with 1 comment', done => {
    api
      .post(`/api/items/${itemId}/reviews`)
      .set('Authorization', `Bearer ${token}`)
      .send(reviewData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.reviews.length).to.equal(1);
        expect(res.body.reviews[0]).to.include.keys([
          'maintitle',
          'content',
          'createdAt',
          'maintitle',
          'updatedAt'
        ]);
        done();
      });
  });
});
