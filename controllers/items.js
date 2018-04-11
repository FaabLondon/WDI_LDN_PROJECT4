//Items controller
const { Item } = require('../models/item');

function indexRoute(req, res, next){
  //in case query string
  return Item.find(req.query)
    .then(items => res.json(items))
    .catch(next);
}

function showRoute(req, res, next){
  return Item.findById(req.params.id)
    .populate('reviews')
    .populate('reviews.user')
    .then(item => res.json(item))
    .catch(next);
}

//newReview for restaurant
function reviewCreateRoute(req, res, next){
  console.log('in review create route', req.body);
  req.body.user = req.currentUser; //add user to new review
  Item.findById(req.params.id)
    .then(item => {
      item.reviews.push(req.body);
      return item.save();
    })
    .then(item => Item.populate(item, {path: 'reviews'}))
    .then(item => res.json(item))
    .catch(next);
}

function reviewDeleteRoute(req, res, next){
  Item.findById(req.params.id)
    .then(item => {
      //returns review with certain ID
      const review = item.reviews.id(req.params.reviewId);
      review.remove();
      return item.save();
    })
    .then(item => Item.populate(item, {path: 'reviews'}))
    .then(item => res.json(item))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  reviewCreate: reviewCreateRoute,
  reviewDelete: reviewDeleteRoute
};
