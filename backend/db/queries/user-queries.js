// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const bcrypt = require('bcrypt');
const knex = require('../knex');

module.exports = {
  getAllByParam(param) {
    const query = knex('users');
    if (param.username) {
      query.where('username', 'like', `%${param.username}%`)
      .leftJoin('developers', 'users.id', 'developers.user_id')
      .select(['users.id','users.username','users.email','users.password', 'users.firstname','users.lastname', 'users.bio', 'users.visionary_categories','users.ratings','users.profile_image', 'users.user_type_id', 'users.connections', 'users.notifications', 'users.notification_settings','users.subscription_settings', 'users.project_ids','users.token_version',  'developers.dev_roles', 'developers.dev_categories', 'developers.dev_skills', 'developers.hiring_options', 'developers.dev_bio', 'developers.dev_portfolio_link', 'developers.dev_github_link'])
      .first();
    }
    if (param.rating) {
      query.where('rating', param.rating)
      .leftJoin('developers', 'users.id', 'developers.user_id')
      .select(['users.id','users.username','users.email','users.password', 'users.firstname','users.lastname', 'users.bio', 'users.visionary_categories','users.ratings','users.profile_image', 'users.user_type_id', 'users.connections', 'users.notifications', 'users.notification_settings','users.subscription_settings', 'users.project_ids','users.token_version',  'developers.dev_roles', 'developers.dev_categories', 'developers.dev_skills', 'developers.hiring_options', 'developers.dev_bio', 'developers.dev_portfolio_link', 'developers.dev_github_link'])
    }
    if (param.email) {
      query.where('email', param.email)
      .leftJoin('developers', 'users.id', 'developers.user_id')
      .select(['users.id','users.username','users.email','users.password', 'users.firstname','users.lastname', 'users.bio', 'users.visionary_categories','users.ratings','users.profile_image', 'users.user_type_id', 'users.connections', 'users.notifications', 'users.notification_settings','users.subscription_settings', 'users.project_ids','users.token_version',  'developers.dev_roles', 'developers.dev_categories', 'developers.dev_skills', 'developers.hiring_options', 'developers.dev_bio', 'developers.dev_portfolio_link', 'developers.dev_github_link'])
      .first();
    }
    return query;
  },
  getUserById(id) {
    return knex('users')
          .where('users.id', id)
          .leftJoin('developers', 'users.id', 'developers.user_id')
          .select(['users.id', 'users.username', 'users.email', 'users.password','users.firstname','users.lastname', 'users.bio', 'users.visionary_categories','users.ratings','users.profile_image', 'users.user_type_id', 'users.connections', 'users.notifications', 'users.notification_settings','users.subscription_settings', 'users.project_ids','users.token_version',  'developers.dev_roles', 'developers.dev_categories', 'developers.dev_skills', 'developers.hiring_options', 'developers.dev_bio', 'developers.dev_portfolio_link', 'developers.dev_github_link'])
          .first();
  },
  getDevUsers() {
    return knex('users')
            .where('user_type_id', 1)
            .join('developers', 'users.id', '=', 'developers.user_id')
            .select(['users.id','users.username','users.email','users.password','users.firstname','users.lastname', 'users.bio', 'users.visionary_categories','users.ratings','users.profile_image', 'users.user_type_id', 'users.connections', 'users.notifications',  'users.notification_settings','users.subscription_settings', 'users.project_ids','users.token_version', 'developers.dev_roles', 'developers.dev_categories', 'developers.dev_skills', 'developers.hiring_options', 'developers.dev_bio', 'developers.dev_portfolio_link', 'developers.dev_github_link'])
  },
  getVisionaryUsers() {
    return knex('users')
            .where('user_type_id', 2)
            .select(['users.id','users.username','users.email','users.password','users.firstname','users.lastname', 'users.bio', 'users.visionary_categories','users.ratings','users.profile_image', 'users.user_type_id', 'users.connections', 'users.notifications',  'users.notification_settings','users.subscription_settings', 'users.project_ids','users.token_version'])
  },
  createDevUser({newUserInfo, newDevUserInfo}) {
    return knex("users")
    .insert(newUserInfo)
    .returning('id')
    .then(function (response) {
      return knex('developers')
        .insert({ ...newDevUserInfo, user_id: response[0] })
        .returning('*')
    }).then(user => user[0]);
  },
  updateUserById(id, userInfo) {
    const { updates, table } = userInfo
    const id_column = (table != 'users') ? 'user_id' : 'id'

    // When a user updates the password, hash it before storing the password in the db
    if (updates.password) {
      updates.password = bcrypt.hashSync(updates.password, 10)
    }

    return knex(table).where(id_column, id).update(updates, '*').then(user => user[0]);
  },
  deleteUserById(id) {
    return knex('users').where('id', id).del();
  },
  revokeRefreshToken(id) {
    return knex('users').where('id', id).update({ 'token_version': knex.raw('token_version + 1') })
  }
}
