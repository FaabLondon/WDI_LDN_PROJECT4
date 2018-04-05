//Items controller
const { Item } = require('../models/item');

function indexRoute(req, res, next){
  return Item.find()
    .then(items => res.json(items))
    .catch(next);
}

function showRoute(req, res, next){
  return Item.findById(req.params.id)
    .then(item => res.json(item))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute
};
