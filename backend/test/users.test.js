// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
process.env.NODE_ENV = 'test';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const knex = require('../db/knex');
const fixtures = require('./fixtures');

chai.use(chaiHttp);
const expect = chai.expect;

describe('CRUD users', () => {
  before((done) => {
    knex.migrate.latest()
     .then(() => {
       return knex.seed.run()
     }).then(() => done());
  });

  it('Working', () => {
    console.log('Test working');
  })


  // it('Created a new User record', () => {
  //   request(app)
  //     .post('/api/v1/users/create')
  //     .send(fixtures.newUser)
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(201)
  //     .then(async (res) => {
  //       const user = await res.body;
  //       expect(user).to.be.a('object');
  //       fixtures.newUser.id = user.id;
  //       fixtures.newUser.user_since = user.user_since;
  //       expect(user).to.deep.equal(fixtures.newUser);
  //     })
  // });

  it('Lists all Dev User Records', (done) => {
    chai.request(app)
      .get('/api/v1/users/devs')
      .end((err, res) => {
        const users = res.body;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(users).to.be.a('array');
        expect(users).to.have.lengthOf(12);
        expect(users).to.equal(fixtures.devUsers);
        done();
    })
  })

  it('Lists all Visionary User Records', (done) => {
    chai.request(app)
      .get('/api/v1/users/visionaries')
      .set('Accept', 'application/json')
      .end((err, res) => {
        const users = res.body;
        expect(users).to.be.a('array');
        expect(users).to.have.length(9);
        expect(users).to.deep.equal(fixtures.visUsers);
        done();
      })
  })

  // it('Fetch User Record By Id', () => {
  //   request(app)
  //     .get('/api/v1/users/5')
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .then(async (res) => {
  //       const user = res.body;
  //       user.should.be.a('object');
  //       user.should.equal(fixtures.userId5);
  //     }).catch(err => console.log(err));
  // })






  // it('Lists all Dev User Records', (done) => {
  //   request(app)
  //     .get('/api/v1/users/dev-accounts')
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200, done)
  //     .then((response) => {
  //       expect(response.body).to.be.a('array');
  //       expect(response.body).to.deep.equal(fixtures.users.filter(user => user.account_types.includes('developer')));
  //       done();
  //     });
  // })

  // it('Lists all Customer Records', (done) => {
  //   request(app)
  //     .get('/api/v1/users/customers')
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200, done)
  //     .then((response) => {
  //       expect(response.body).to.be.a('array');
  //       expect(response.body).to.deep.equal(fixtures.users.filter(user => user.account_types.includes('entrepreneur')));
  //       done();
  //     });
  // })
  // it('Show one User record by Id', (done) => {
  //   request(app)
  //     .get('/api/v1/users/1')
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .then((response) => {
  //       expect(response.body).to.be.a('object');
  //       expect(response.body).to.deep.equal(fixtures.users[0]);
  //       done();
  //     });
  // })

  // it('Update User record', (done) => {
  //   fixtures.user.username = 'updated username'
  //   request(app)
  //     .put('/api/v1/users/3')
  //     .send(fixtures.user)
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .then((response) => {
  //       expect(response.body).to.be.a('object');
  //       fixtures.user.id = response.body.id;
  //       expect(response.body).to.deep.equal(fixtures.user);
  //       done();
  //     })
  // });

  // it('Deletes User record', (done) => {
  //   request(app)
  //     .put('/api/v1/users/3')
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .then((response) => {
  //       expect(response.body).to.be.a('object');
  //       expect(response.body).to.deep.equal({
  //         deleted: true
  //       });
  //       done();
  //     })
  // });
})
