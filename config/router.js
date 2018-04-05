const router = require('express').Router();
const items = require('../controllers/items');
//const orders = require('../controllers/orders');

// const secureRoute = require('../lib/secureRoute');
// const auth = require('../controllers/auth');

router.route('/items')
  .get(items.index);

router.route('/items/:id')
  .get(items.show);

module.exports = router;
