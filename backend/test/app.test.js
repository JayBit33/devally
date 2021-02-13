// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const request = require('supertest');
const app = require('../index');
const { expect } = require('chai')
const knex = require('../db/knex');

const fixtures = require('./fixtures');

describe('CRUD users', () => {
  before(() => {
    // run migrations
    knex.migrate.latest()
      .then(() => {
        // run seeds
        return knex.seed.run();
      }).then(() => document());
  });

  it('Lists all User Records', (done) => {
    request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
      .then((response) => {
        expect(response.body).to.be.a('array');
        expect(response.body).to.deep.equal(fixtures.users);
        done();
      });
  })

  it('Lists all Dev User Records', (done) => {
    request(app)
      .get('/api/v1/users/dev-accounts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
      .then((response) => {
        expect(response.body).to.be.a('array');
        expect(response.body).to.deep.equal(fixtures.users.filter(user => user.account_types.includes('developer')));
        done();
      });
  })

  it('Lists all Customer Records', (done) => {
    request(app)
      .get('/api/v1/users/customers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
      .then((response) => {
        expect(response.body).to.be.a('array');
        expect(response.body).to.deep.equal(fixtures.users.filter(user => user.account_types.includes('entrepreneur')));
        done();
      });
  })
  it('Show one User record by Id', (done) => {
    request(app)
      .get('/api/v1/users/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(fixtures.users[0]);
        done();
      });
  })

  it('Created a new User record', (done) => {
    request(app)
      .post('/api/v1/users/')
      .send(fixtures.user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        fixtures.user.id = response.body.id;
        expect(response.body).to.deep.equal(fixtures.user);
        done();
      })
  });

  it('Update User record', (done) => {
    fixtures.user.username = 'updated username'
    request(app)
      .put('/api/v1/users/3')
      .send(fixtures.user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        fixtures.user.id = response.body.id;
        expect(response.body).to.deep.equal(fixtures.user);
        done();
      })
  });

  it('Deletes User record', (done) => {
    request(app)
      .put('/api/v1/users/3')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal({
          deleted: true
        });
        done();
      })
  });
})
