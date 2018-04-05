//Seeds mongoose DB with data
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { Item } = require('../models/item');
const ItemData = require('./data/items');
const { dbURI } = require('../config/environment');

mongoose.connect(dbURI, (err, db) =>{
  db.dropDatabase();
  Item.create(ItemData)
    .then(items => {
      console.log(`${items.length} records created`);
    })
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
