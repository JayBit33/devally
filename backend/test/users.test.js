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
  // before((done) => {
  //   knex.migrate.latest()
  //    .then(() => {
  //      return knex.seed.run()
  //    }).then(() => done());
  // });

  it('its working', (done) => {
    done();
  })

  it('Lists all Dev User Records', (done) => {
    chai.request(app)
      .get('/api/v1/users/devs')
      .end((err, res) => {
        const users = res.body;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(users).to.be.a('array');
        expect(users).to.have.length(15);
        users.forEach((user,idx) => {
          fixtures.devUsers[idx].password = user.password
        })
        expect(users).to.deep.equal(fixtures.devUsers);
        done();
    })
  })

  it('Lists all Visionary User Records', (done) => {
    chai.request(app)
      .get('/api/v1/users/visionaries')
      .set('Accept', 'application/json')
      .end((err, res) => {
        const users = res.body;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(users).to.be.a('array');
        expect(users).to.have.length(9);
        users.forEach((user,idx) => {
          fixtures.visUsers[idx].password = user.password
        })
        expect(users).to.deep.equal(fixtures.visUsers);
        done();
    })
  })

  it('Fetch User Record By Id', (done) => {
   chai.request(app)
    .get('/api/v1/users/5')
    .set('Accept', 'application/json')
    .end((err, res) => {
      const user = res.body;
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(user).to.be.a('object');
      fixtures.userId5.password = user.password;
      expect(user).to.deep.equal(fixtures.userId5);
      done();
    })
  })

  it('Created a new Dev User record', (done) => {
    chai.request(app)
      .post('/api/v1/users/create-dev-account')
      .set('Accept', 'application/json')
      .send({ newUserInfo: fixtures.newUserInfo, newDevUserInfo: fixtures.newDevUserInfo})
      .end((err, res) => {
        const user = res.body;
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(user).to.be.a('object');
        fixtures.newDevUserInfoReturned.id = user.id
        fixtures.newDevUserInfoReturned.user_id = user.user_id;
        expect(user).to.deep.equal(fixtures.newDevUserInfoReturned);
        console.log('error', err)
        done();
      })
  });

  it('Update visionary user data', (done) => {
    const userInfo = {
      updates: {
        username: 'jem33',
        firstname: 'Jem',
      },
      table: 'users'
    };

    chai.request(app)
      .put('/api/v1/users/24')
      .set('Accept', 'application/json')
      .send(userInfo)
      .end((err, res) => {
        const user = res.body;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(user).to.be.a('object');
        expect(user.username).to.equal('jem33');
        expect(user.firstname).to.equal('Jem');
        done();
      });
  })
  it('Search for user by username', (done) => {
    chai.request(app)
      .get('/api/v1/users/query')
      .set('Accept', 'application/json')
      .query({username: 'waveybits'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.username).to.equal('waveybits');
        expect(res.body.bio).to.equal('Ready to dedicate time to moving this idea forward.');
        done();
      });
  })
  it('Delete a user', (done) => {
    chai.request(app)
      .delete('/api/v1/users/24')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(202);
        expect(res).to.be.json;
        expect(res.body.deleted).to.equal(true);
        done();
      });
  })
})
