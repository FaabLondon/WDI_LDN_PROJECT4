//controllers for orders for current user
const User = require('../models/user');
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

//route to create an order
function orderCreateRoute(req, res, next){
  stripe.charges.create({
    amount: parseInt(parseFloat(req.body.amount * 100), 10),
    currency: req.body.currency,
    source: req.body.token,
    description: 'TEST'
  }) //if payment successful goes to then otherwise catch(next)
    .then(() => User.findById(req.currentUser._id))
    .then(user => {
      user.orders.push(Object.assign({}, req.body , { orderList: user.cart }));
      user.cart = []; //delete content of cart
      return user.save();
    })
    .then(() => res.status(200).json({message: 'Payment successful'}))
    .catch(next); //cathes errors of all promises, will got to global error catcher
}

//to delete an order - would need to include
function orderDeleteRoute(req, res, next){
  return User.findById(req.currentUser._id)
    .then(user => {
      const order = user.orders.find(elt => elt._id.equals(req.params.id));
      order.remove();
      user.save();
      res.sendStatus(204);
    })
    .catch(next);
}

//Populate not working
function orderShowRoute(req, res, next){
  return User.findById(req.currentUser._id)
    .populate('orders.orderList')
    .then(user => user.orders.id(req.params.id))
    .then(order => res.json(order))
    .catch(next);
}

//index route for all orders for one specific user
function orderIndexRoute(req, res, next){
  return User.findById(req.currentUser._id)
    .then(user => res.json(user.orders))
    .catch(next);
}

//Order update route --> probably not possible to amend order once placed for now...
//maybe offer an option to amend end date for rental..

module.exports = {
  orderCreate: orderCreateRoute,
  orderDelete: orderDeleteRoute,
  orderShow: orderShowRoute,
  orderIndex: orderIndexRoute
};
