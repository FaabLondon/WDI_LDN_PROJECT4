const router = require('express').Router();
const items = require('../controllers/items');
const cart = require('../controllers/cart');
const secureRoute = require('../lib/secureRoute');
const orders = require('../controllers/orders');
const auth = require('../controllers/auth');

//index route for items
router.route('/items')
  .get(items.index);

//show route for items
router.route('/items/:id')
  .get(items.show);

//show route for shopping cart
router.route('/cart')
  .get(secureRoute, cart.show);

//add and delete item in cart Route
router.route('/cart/items/:id')
  .post(secureRoute, cart.itemCreate)
  .delete(secureRoute, cart.itemDelete);

//Create a new order
router.route('/orders')
  .post(secureRoute, orders.orderCreate)
  .get(secureRoute, orders.orderIndex);

//Show and Delete an order
router.route('/orders/:id')
  .get(secureRoute, orders.orderShow)
  .delete(secureRoute, orders.orderDelete);

//Add and Delete a review
//NEW review
router.route('/items/:id/reviews')
  .post(secureRoute, items.reviewCreate);

//DELETE review
router.route('/items/:id/reviews/:reviewId')
  .delete(secureRoute, items.reviewDelete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/editProfile')
  .put(secureRoute, auth.updateUserRoute);

router.route('/user')
  .get(secureRoute, auth.showUserRoute);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
