// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const knex = require('../knex');

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
      query.where('email', param.email)
           .select(['users.id','users.username','users.email', 'users.password', 'users.firstname','users.lastname', 'users.bio', 'users.visionary_categories','users.rating','users.profile_image', 'users.user_type_id', 'users.connections', 'users.notifications', 'users.tasks', 'users.notification_settings','users.subscription_settings','users.token_version', 'users.user_since'])
           .first();
    }
    return query;
  },
  getUserById(id) {
    return knex('users')
          .where('users.id', id)
          .leftJoin('developers', 'users.id', 'developers.user_id')
          .select(['users.id','users.username','users.email','users.firstname','users.lastname', 'users.bio', 'users.visionary_categories','users.rating','users.profile_image', 'users.user_type_id', 'users.connections', 'users.notifications', 'users.tasks', 'users.notification_settings','users.subscription_settings','users.token_version',  'developers.dev_roles', 'developers.dev_categories', 'developers.dev_skills', 'developers.hiring_options', 'developers.portfolio', 'developers.dev_bio', 'developers.dev_rating'])
          .first();
  },
  getDevUsers() {
    // return knex('users')
    //         .where('user_type_id', 1)
    //         .join('developers', 'users.id', '=', 'developers.user_id')
            knex.select(['users.id','users.username','users.email','users.firstname','users.lastname', 'users.bio', 'users.visionary_categories','users.rating','users.profile_image', 'users.user_type_id', 'users.connections', 'users.notifications', 'users.tasks', 'users.notification_settings','users.subscription_settings','users.token_version', 'developers.dev_roles', 'developers.dev_categories', 'developers.dev_skills', 'developers.hiring_options', 'developers.portfolio', 'developers.dev_bio', 'developers.dev_rating'])
              .from('users').leftJoin('developers', () => {
                this.on('users.id', '=', 'developers.user_id')
              })
          },
  getVisionaryUsers() {
    return knex('users')
            .where('user_type_id', 2)
            .select(['users.id','users.username','users.email','users.firstname','users.lastname', 'users.bio', 'users.visionary_categories','users.rating','users.profile_image', 'users.user_type_id', 'users.connections', 'users.notifications', 'users.tasks', 'users.notification_settings','users.subscription_settings','users.token_version'])
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
