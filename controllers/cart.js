//controllers for shopping cart for current user
const User = require('../models/user');
const Item = require('../models/item');
const Promise = require('bluebird');

//route to add an item in cart
function itemCreateRoute(req, res, next){
  // Promise.props({
  //   currentUser: User.findOne(req.currentUser._id),
  //   addedItem: Item.find(req.params.id)
  // })
  //   .then(data => {
  //     data.currentUser.currentCart.push(data.addedItem);
  //     return data.currentUser.save();
  //   })
  //   .catch(next);
}

function showRoute(req, res, next){
  User.findOne(req.currentUser._id)
    .then(user => res.json(user.currentCart))
    .catch(next);
}

module.exports = {
  show: showRoute,
  itemCreate: itemCreateRoute
};
