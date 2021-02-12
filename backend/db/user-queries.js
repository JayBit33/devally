// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const knex = require('./knex');

module.exports = {
  getAllUsers() {
    // return knex('users');
    knex('users').where('user_type_id', 1).orWhere('user_type_id', 3)
    .select(
      'users.id',
      'users.username',
      'users.email',
      'users.password',
      'users.firstname',
      'users.lastname',
      'users.profile_image',
      'users.user_since',
      'developers.roles',
      'developers.categories',
      'developers.hiring_options',
      'developers.rating',
      'developers.bio',
      'developers.profile_image',
      'developers.rating',
    )
    .from('users')
    .innerJoin('developers', 'users.id', 'developers.user_id')
  },
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
  getCustomers() {
    return knex('users').whereRaw("users.account_types ->> 0 = 'entrepreneur' or users.account_types ->> 1 = 'entrepreneur'");
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
