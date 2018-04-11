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

const cartData = [{
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
  available: true
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
  available: true
}];

const itemData = cartData;
let token = '';

describe('GET /cart', () => {
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
        token = jwt.sign({ sub: data.user._id }, secret, { expiresIn: '5m' });
        //need to push the 2 items _id into the cart
        data.user.cart.push(data.items[0]._id);
        data.user.cart.push(data.items[1]._id);
        data.user.save();
      })
      .then(done);
  });

  //test passes but I can't see the user / cart in DB
  it('should return a 200 response', done => {
    api
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .expect(200, done);
  });

  it('should return an array of items', done => {
    api
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach(item => {
          expect(item).to.include.keys([
            'brand',
            'shortDescription',
            'longDescription',
            'retailPrice',
            'rentalPrice',
            'category',
            'type',
            'occasion',
            'colors',
            'sizeAvailable',
            'mainImage',
            'smallImages',
            'available'
          ]);
        });
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.body = res.body.sort((a, b) => a.brand > b.brand);
        res.body.forEach((item, i) => {
          expect(item.brand).to.eq(cartData[i].brand);
          expect(item.shortDescription).to.eq(cartData[i].shortDescription);
          expect(item.longDescription).to.eq(cartData[i].longDescription);
          expect(item.retailPrice).to.eq(cartData[i].retailPrice);
          expect(item.rentalPrice).to.eq(cartData[i].rentalPrice);
          expect(item.category).to.eq(cartData[i].category);
          expect(item.type).to.eq(cartData[i].type);
          expect(item.occasion).to.deep.eq(cartData[i].occasion);
          expect(item.colors).to.deep.eq(cartData[i].colors);
          expect(item.sizeAvailable).to.eq(cartData[i].sizeAvailable);
          expect(item.mainImage).to.eq(cartData[i].mainImage);
          expect(item.smallImages).to.deep.eq(cartData[i].smallImages);
          expect(item.available).to.eq(cartData[i].available);
        });
        done();
      });
  });
});
