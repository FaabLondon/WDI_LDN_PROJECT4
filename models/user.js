const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//get Item and Order models
const { itemSchema } = require('./item');
const orderSchema = require('./order');

const userSchema = new mongoose.Schema({
  username: {type: String, required: 'Username is required'},
  email: {type: String, required: 'Email is required', unique: true},
  password: {type: String, required: 'Password is required'},
  admin: {type: Boolean, default: false},
  picture: {type: String, default: 'https://images.cdn.stuff.tv/sites/stuff.tv/files/avatar.png'},
  currentCart: [itemSchema],
  pastOrders: [orderSchema],
  favourites: [itemSchema]
});

//to protect our users passwords
userSchema.set('toJSON', {
  transform(doc, json){
    delete json.password;
    return json;
  }
});

//setup the password confirmation virtual
userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

//pre-validate hook - password confirmation check
//Middleware checks data before validating data
//.isModified (when modify password in DB) and .invalidate come from Mongoose
userSchema.pre('validate', function checkPasswords(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'passwords do not match');
  }
  next();
});

// Hash password
// Need to check again as user could only be changing the email in DB
userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  next();
});

//check that plain text password matches password in DB
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
