const knex = require('./knex');

module.exports = {
  getAllUsers() {
    return knex('users');
  },
  getAllByParam(param) {
    const query = knex('users');
    if (param.username) {
      query.where('username', 'like', `%${param.username}%`);
    }
    if (param.rating) {
      query.where('rating', param.rating);
    }
    return query;
  },
  getUserById(id) {
    return knex('users').where('id', id).first();
  },
  getDevUsers() {
    return knex('users').whereRaw("users.account_types ->> 0 = 'developer' or users.account_types ->> 1 = 'developer'");
  },
  getCustomers() {
    return knex('users').whereRaw("users.account_types ->> 0 = 'entrepreneur' or users.account_types ->> 1 = 'entrepreneur'");
  },
  createUser(user) {
    return knex('users').insert(user, '*');
  },
  updateUserById(id, user) {
    return knex('users').where('id', id).update(user, '*');
  },
  deleteUserById(id) {
    return knex('users').where('id', id).del();
  }
}
