const router = require('express').Router();
const items = require('../controllers/items');
const cart = require('../controllers/cart');
const secureRoute = require('../lib/secureRoute');
//const orders = require('../controllers/orders');
const auth = require('../controllers/auth');

router.route('/items')
  .get(items.index); //index route for items

router.route('/items/:id')
  .get(items.show); //show route for items

//show route for shopping cart
router.route('/cart')
  .get(secureRoute, cart.show);

//add item to cart Route
router.route('/cart/items/:id')
  .post(secureRoute, cart.itemCreate)
  .delete(secureRoute, cart.itemDelete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
