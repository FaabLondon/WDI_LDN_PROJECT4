const mongoose = require('mongoose');
// const Item = require('./item');

//removed the user reference as all orders will be attached to the user
const orderSchema = new mongoose.Schema({
  orderList: [{type: mongoose.Schema.ObjectId, ref: 'Item'}],
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

// //add virtual to display time stamp on order
// orderSchema
//   .virtual('formattedDate') //Name of the virtual
//   .get(function getFormattedDate() { //it gets data from the DB
//     const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//     return this.createdAt.getDay() + monthNames[this.createdAt.getMonth()] + '-' + this.createdAt.getFullYear();
//   });

module.exports = orderSchema;
