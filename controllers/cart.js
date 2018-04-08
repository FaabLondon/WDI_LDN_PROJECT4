//controllers for shopping cart for current user
const User = require('../models/user');

//route to add an item in user cart
function itemCreateRoute(req, res, next){
  User.findById(req.currentUser._id)
    .then(user => {
      user.cart.push(req.params.id);
      return user.save();
    })
    .then(user => User.populate(user, {path: 'cart'}))
    .then(user => res.status(200).json(user.cart))
    .catch(next);
}

//route to delete an item from the user cart
function itemDeleteRoute(req, res, next){
  return User.findOne(req.currentUser._id)
    .then(user => {
      user.cart.splice(user.cart.indexOf(req.params.id), 1);
      return user.save();
    })
    .then(user => User.populate(user, {path: 'cart'}))
    .then(user => res.json(user.cart))
    //res.sendStatus(204);
    .catch(next);
}

function showRoute(req, res, next){
  User.findOne(req.currentUser._id)
    .populate('cart')
    .then(user => res.json(user.cart))
    .catch(next);
}


module.exports = {
  show: showRoute,
  itemCreate: itemCreateRoute,
  itemDelete: itemDeleteRoute
};
