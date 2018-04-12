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

describe('PUT /editProfile', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => token = jwt.sign({ sub: user._id }, secret, { expiresIn: '5m' }))
      .then(() => done());
  });

  it('should return 401 - unauthorized - response if no token', done => {
    api
      .put('/api/editProfile')
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 200 response if user authenticated', done => {
    api
      .put('/api/editProfile')
      .set('Authorization', `Bearer ${token}`)
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return a 401 unauthorized response if the passwords don\'t match', done => {
    const badData = Object.assign({}, userData, { password: 'bad' });
    api
      .put('/api/editProfile')
      .set('Authorization', `Bearer ${token}`)
      .send(badData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return the updated user profile', done => {
    const newData = Object.assign({}, userData, { name: 'Marge' });
    api
      .put('/api/editProfile')
      .set('Authorization', `Bearer ${token}`)
      .send(newData)
      .end((err, res) => {
        expect(res.body.name).to.eq(newData.name);
        done();
      });
  });


});
