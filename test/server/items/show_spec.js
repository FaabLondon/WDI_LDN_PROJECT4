/* global api, describe, it, expect, beforeEach */
const { Item } = require('../../../models/item');

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

let item = {};

describe('GET /items/:id', () => {

  beforeEach(done => {
    Promise.all([
      Item.remove({})
    ])
      .then(() => Item.create(itemData))
      .then(items => item = items[0]) //1st item returned
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api
      .get(`/api/items/${item._id}`)
      .expect(200, done);
  });

  it('should return one item', done => {
    api
      .get(`/api/items/${item._id}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys([
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
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .get(`/api/items/${item._id}`)
      .end((err, res) => {
        expect(res.body.brand).to.eq(itemData[0].brand);
        expect(res.body.shortDescription).to.eq(itemData[0].shortDescription);
        expect(res.body.longDescription).to.eq(itemData[0].longDescription);
        expect(res.body.retailPrice).to.eq(itemData[0].retailPrice);
        expect(res.body.rentalPrice).to.eq(itemData[0].rentalPrice);
        expect(res.body.category).to.eq(itemData[0].category);
        expect(res.body.type).to.eq(itemData[0].type);
        expect(res.body.occasion).to.deep.eq(itemData[0].occasion);
        expect(res.body.colors).to.deep.eq(itemData[0].colors);
        expect(res.body.sizeAvailable).to.eq(itemData[0].sizeAvailable);
        expect(res.body.mainImage).to.eq(itemData[0].mainImage);
        expect(res.body.smallImages).to.deep.eq(itemData[0].smallImages);
        expect(res.body.available).to.eq(itemData[0].available);
        done();
      });
  });
});
