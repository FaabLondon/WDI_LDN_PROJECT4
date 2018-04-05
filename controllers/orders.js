//controllers for orders for current user
const User = require('../models/user');

//route to create an order
function orderCreateRoute(req, res, next){

  User.findOne(req.currentUser._id)
    .then(user => {
      //insert cart into req.body into new object which is pushed to orders array
      user.orders.push(Object.assign({}, req.body , { orderList: user.cart }));
      user.cart = []; //delete content of cart
      user.save();
      return res.status(200).json(user);
    })
    .catch(next);
}


module.exports = {
  orderCreate: orderCreateRoute
};
