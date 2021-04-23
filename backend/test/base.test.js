// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
process.env.NODE_ENV = 'test';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const knex = require('../db/knex');
const fixtures = require('./fixtures');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Test baseApi routes', () => {
  before((done) => {
    knex.migrate.latest()
     .then(() => {
       return knex.seed.run()
     }).then(() => done());
  });

  it('Lists all Projects', (done) => {
    chai.request(app)
      .get('/api/v1/dev-options')
      .end((err, res) => {
        const options = res.body;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(options).to.be.a('object');
        expect(options).to.have.property('roles');
        expect(options).to.have.property('categories');
        expect(options).to.have.property('hiring_options');
        expect(options.roles).to.have.length(6);
        expect(options.categories).to.have.length(4);
        expect(options.hiring_options).to.have.length(2);
        done();
    })
  })
})
