const mongoose = require('mongoose');
const reviewSchema = require('./review');

//items Schema
const itemSchema = new mongoose.Schema({
  brand: {type: String, required: 'Brand is required'},
  shortDescription: {type: String, required: 'Short description is required'},
  longDescription: {type: String, required: 'Long description is required'},
  retailPrice: {type: Number, required: 'Original retail price is required'},
  rentalPrice: {type: Number, required: 'Original retail price is required'},
  category: {type: String, required: 'Category is required', enum: ['Clothing', 'Accessories']},
  type: {type: String, required: 'Type is required', enum: ['Jewellery', 'Handbags', 'Sunglasses', 'Bridal', 'Dresses', 'Activewear', 'Tops', 'Jackets & Coats', 'Trousers', 'Knits']},
  occasion: [{type: String, required: 'Occasion is required'}],
  colors: [{type: String, required: 'Color is required'}],
  sizeAvailable: [{type: String, enum: ['XL', 'L', 'M', 'S', 'XS'], required: 'Size is required'}],
  mainImage: {type: String, required: 'Main image is required'},
  smallImages: [{type: String}], //array of strings
  available: {type: Boolean},
  reviews: [reviewSchema]
});
//occasion: ['Daytime', 'Work', 'Weekend', 'Vacation', 'Formal', 'Party', 'Maternity']

module.exports = {
  itemSchema: itemSchema,
  Item: mongoose.model('Item', itemSchema)
};
