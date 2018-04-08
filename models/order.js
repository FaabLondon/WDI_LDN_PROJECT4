const mongoose = require('mongoose');
// const Item = require('./item');

//removed the user reference as all orders will be attached to the user
const orderSchema = new mongoose.Schema({
  orderList: [{type: mongoose.Schema.ObjectId, ref: 'Item'}],
  // rentalStart: {type: Date, required: 'You need to enter the start of rental'},
  // rentalEnd: {type: Date, required: 'You need to enter the end of rental'},
  deliveryAddress: {type: String, required: 'You need to enter the delivery address'},
  deliveryPostcode: {type: String, required: 'You need to enter the delivery postcode'},
  deliveryCity: {type: String, required: 'You need to enter the delivery city'},
  billingAddress: {type: String, required: 'You need to enter the billing address'},
  billingPostcode: {type: String, required: 'You need to enter the billing postcode'},
  billingCity: {type: String, required: 'You need to enter the billing address'}
}, {
  timestamps: true
});


module.exports = orderSchema;
