/* global api, describe, it, expect, beforeEach */
const { Item } = require('../../../models/item');
const User = require('../../../models/user');

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

describe('GET /items', () => {
  beforeEach(done => {
    Promise.all([
      Item.remove({}),
      User.remove({})
    ])
      .then(() => Item.create(itemData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api
      .get('/api/items')
      .expect(200, done);
  });

  it('should return an array of items', done => {
    api
      .get('/api/items')
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
            'available',
            'reviews'
          ]);
        });
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .get('/api/items')
      .end((err, res) => {
        res.body = res.body.sort((a, b) => a.brand > b.brand);
        res.body.forEach((item, i) => {
          expect(item.brand).to.eq(itemData[i].brand);
          expect(item.shortDescription).to.eq(itemData[i].shortDescription);
          expect(item.longDescription).to.eq(itemData[i].longDescription);
          expect(item.retailPrice).to.eq(itemData[i].retailPrice);
          expect(item.rentalPrice).to.eq(itemData[i].rentalPrice);
          expect(item.category).to.eq(itemData[i].category);
          expect(item.type).to.eq(itemData[i].type);
          expect(item.occasion).to.deep.eq(itemData[i].occasion);
          expect(item.colors).to.deep.eq(itemData[i].colors);
          expect(item.sizeAvailable).to.eq(itemData[i].sizeAvailable);
          expect(item.mainImage).to.eq(itemData[i].mainImage);
          expect(item.smallImages).to.deep.eq(itemData[i].smallImages);
          expect(item.available).to.eq(itemData[i].available);
          expect(item.reviews).to.deep.eq(itemData[i].reviews);
        });
        done();
      });
  });
});
