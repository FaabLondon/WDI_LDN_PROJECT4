const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function register(req, res, next) {
  User.create(req.body)
    .then(user => {
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' });
      res.json({ user, token, message: 'Thank you for registering' });
    })
    .catch(next);
}

function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' });
      res.json({ user, token, message: `Welcome back ${user.username}` });
    })
    .catch(next);
}

// edit profile for user
function updateUserRoute(req, res, next){
  return User.findById(req.currentUser._id)
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      Object.assign(user, req.body, { passwordConfirmation: req.body.password});
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
  //error caught by global error handler as 422 but wih no error message
}

// //show profile for user
// function showUserProfileRoute(req, res, next){
//   User.findById(req.currentUser._id)
//     .then(user => res.json(user))
//     .catch(next);
// }

module.exports = {
  register,
  login,
  updateUserRoute
};
