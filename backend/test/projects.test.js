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

describe('CRUD projects', () => {
  before((done) => {
    knex.migrate.latest()
     .then(() => {
       return knex.seed.run()
     }).then(() => done());
  });

  it('Lists all Projects', (done) => {
    chai.request(app)
      .get('/api/v1/projects/')
      .end((err, res) => {
        const projects = res.body;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(projects).to.be.a('array');
        expect(projects).to.have.length(5);
        projects.forEach((project,idx) => {
          fixtures.projects[idx].id = project.id;
          fixtures.projects[idx].date_created = project.date_created;
        })
        expect(projects).to.deep.equal(fixtures.projects);
        done();
    })
  })

  it('Fetch Project By Id', (done) => {
   chai.request(app)
    .get('/api/v1/projects/3')
    .set('Accept', 'application/json')
    .end((err, res) => {
      const project = res.body;
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(project).to.be.a('object');
      fixtures.projects[2].id = project.id;
      fixtures.projects[2].date_created = project.date_created;
      expect(project).to.deep.equal(fixtures.projects[2]);
      done();
    })
  })
})
