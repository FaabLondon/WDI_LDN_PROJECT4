const mongoose = require('mongoose');
// const Item = require('./item');

//removed the user reference as all orders will be attached to the user
const orderSchema = new mongoose.Schema({
  orderList: [{type: mongoose.Schema.ObjectId, ref: 'Item'}],
  // rentalStart: {type: Date, required: 'You need to enter the start of rental'},
  // rentalEnd: {type: Date, required: 'You need to enter the end of rental'},
  deliveryBillingAddress: {type: String, required: 'You need to enter the delivery address'},
  deliveryBillingPostcode: {type: String, required: 'You need to enter the delivery postcode'},
  deliveryBillingCity: {type: String, required: 'You need to enter the delivery city'},
  token: {type: String},
  amount: {type: Number},
  currency: {type: String},
  payee: {type: String},
  UserEmail: {type: String}
}, {
  timestamps: true
});


module.exports = orderSchema;
