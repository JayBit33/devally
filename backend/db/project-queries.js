// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const knex = require('./knex');

module.exports = {
  getAllByParam(param) {
    const query = knex('projects');
    if (param.creatorId) {
      query.where('creator_id', param.creatorId);
    }
    return query;
  },
  getProjectById(id) {
    return knex('projects').where('id', id).first();
  },
  getProjects() {
    return knex('projects').select('*')
  },
  createProject(project) {
    return knex('projects').insert(project, '*').then(project => project[0]);
  },
  updateProjectById(id, project) {
    return knex('projects').where('id', id).update(project, '*');
  },
  deleteUserById(id) {
    return knex('projects').where('id', id).del();
  }
}
