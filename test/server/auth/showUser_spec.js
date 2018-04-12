/* global api, describe, it, expect, beforeEach */
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const User = require('../../../models/user');
const userData = {
  name: 'testName',
  lastName: 'testLastname',
  username: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test'
};

let token = '';

describe('GET /user', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => token = jwt.sign({ sub: user._id }, secret, { expiresIn: '5m' }))
      .then(() => done());
  });

  it('should return 401 - unauthorized - response if no token', done => {
    api
      .get('/api/user')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 200 response if user authenticated', done => {
    api
      .get('/api/user')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return a user object', done => {
    api
      .get('/api/user')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys([
          'name',
          'lastName',
          'username',
          'email'
        ]);
        done();
      });
  });
});
