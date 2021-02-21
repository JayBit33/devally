// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const knex = require('./knex');

module.exports = {
  getAllByParam(param) {
    const query = knex('users');
    if (param.username) {
      query.where('username', 'like', `%${param.username}%`);
    }
    if (param.rating) {
      query.where('rating', param.rating);
    }
    if (param.email) {
      query.where('email', param.email).first();
    }
    return query;
  },
  getUserById(id) {
    return knex('users').where('id', id).first();
  },
  getDevUsers() {
    return knex('users')
            .join('developers', 'users.id', '=', 'developers.user_id')
            .select('*')
  },
  // get visionary accounts
  getCustomers() {
    return knex('users')
          .join('developers', 'users.id', '=', 'developers.user_id')
          .select('*')
         // .whereRaw("users.user_type_id = 2 or users.user_type_id = 3");
  },
  createUser(user) {
    return knex('users').insert(user, '*').then(user => user[0]);
  },
  updateUserById(id, user) {
    return knex('users').where('id', id).update(user, '*');
  },
  deleteUserById(id) {
    return knex('users').where('id', id).del();
  }
}
