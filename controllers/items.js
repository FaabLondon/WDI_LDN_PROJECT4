const Item = require('../models/item');

function indexRoute(req, res, next){
  return Item.find()
    .then(items => res.json(items))
    .catch(next);
}

module.exports = {
  index: indexRoute
};
