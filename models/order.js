const mongoose = require('mongoose');
const Item = require('./item');

const orderSchema = new mongoose.schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User'},
  rentalList: [Item],
  rentalStart: {type: Date, required: true}
}, {
  timestamps: true
});


module.exports = mongoose.model('Order', orderSchema);
