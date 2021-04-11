// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const knex = require('./knex');

module.exports = {
  getAllByParam(param) {
    const query = knex('users');
    if (param.username) {
      query.where('username', 'like', `%${param.username}%`).first();
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
    return knex('users')
          .where('id', id)
          .join('developers', 'users.id', '=', 'developers.user_id')
          .select('*')
          .first();
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
  updateUserById(id, userInfo) {
    const { updates, table } = userInfo
    let id_column = (table != 'users') ? 'user_id' : 'id'
    return knex(table).where(id_column, id).update(updates, '*').then(user => user[0]);
  },
  deleteUserById(id) {
    return knex('users').where('id', id).del();
  },
  revokeRefreshToken(id) {
    return knex('users').where('id', id).update({ 'token_version': knex.raw('token_version + 1') })
  }
}
