const mongoose = require('mongoose');
// const Item = require('./item');

//removed the user reference
const orderSchema = new mongoose.Schema({
  rentalList: [{type: mongoose.Schema.ObjectId, ref: 'Item'}],
  rentalStart: {type: Date, required: true}
}, {
  timestamps: true
});


module.exports = orderSchema;
