const mongoose = require('mongoose');

//review Schema
const reviewSchema = new mongoose.Schema({
  maintitle: {type: String, minlength: 2, required: true},
  content: {type: String, minlength: 2, required: true},
  rating: {type: Number, min: 0, max: 5},
  moderated: {type: Boolean, default: true},
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

module.exports = reviewSchema;
