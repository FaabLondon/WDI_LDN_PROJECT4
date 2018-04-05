const mongoose = require('mongoose');

//items and review Schema

const reviewSchema = new mongoose.Schema({
  maintitle: {type: String, minlength: 2, required: true},
  content: {type: String, minlength: 2, required: true},
  rating: {type: Number, min: 0, max: 5},
  moderated: {type: Boolean, default: false},
  user: { type: mongoose.Schema.ObjectId, ref: 'User'}
}, {
  timestamps: true
});

//add virtual to display time stamp on review
reviewSchema
  .virtual('formattedDate') //Name of the virtual
  .get(function getFormattedDate() { //it gets data from the DB
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[this.createdAt.getMonth()] + '-' + this.createdAt.getFullYear();
  });

//add methods to check wether a review is owned bt a certain user
reviewSchema.methods.isOwnedBy = function(user){ //pass in logged in User
  return this.user && user._id.equals(this.user._id);   //.this is the comment . HAve to use .equals as comparing 2 objects
};

const itemSchema = new mongoose.schema({
  brand: {type: String, required: 'Brand is required'},
  shortDescription: {type: String, required: 'Short description is required'},
  longDescription: {type: String, required: 'Long description is required'},
  retailPrice: {type: Number, required: 'Original retail price is required'},
  category: {type: String, required: 'Category is required', enum: ['Clothing', 'Accessories']},
  type: {type: String, required: 'Type is required', enum: ['Jewellery', 'Handbags', 'Sunglasses', 'Bridal', 'Dresses', 'Activewear', 'Tops', 'Jackets & Coats', 'Trousers', 'Knits']},
  occasion: [{type: String, required: 'Occasion is required'}],
  colors: [{type: String, required: 'Color is required'}],
  sizeAvailable: [{type: String, enum: ['XL', 'L', 'M', 'S', 'XS'], required: 'Size is required'}],
  mainImage: {type: String, required: 'Main image is required'},
  smallImages: [{type: String}], //array of strings
  available: {type: Boolean}
});
//occasion: ['Daytime', 'Work', 'Weekend', 'Vacation', 'Formal', 'Party', 'Maternity']

module.exports = mongoose.model('Item', itemSchema);
