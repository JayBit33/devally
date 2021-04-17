// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const knex = require('../knex');

module.exports = {
  getAllByParam(param) {
    const query = knex('projects');
    if (param.creatorId) {
      query.where('creator_id', param.creatorId);
    }
    return query;
  },
  getProjects() {
    return knex('projects').select('*')
  },
  getProject(id) {
    return knex('projects').where('id', id).first();
  },
  createProject(project) {
    return knex('projects').insert(project, '*').then(project => project[0]);
  },
  updateProject(id, project) {
    return knex('projects').where('id', id).update(project, '*').then(project => project[0]);
  },
  deleteProject(id) {
    return knex('projects').where('id', id).del();
  }
}
