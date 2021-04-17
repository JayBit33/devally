// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const knex = require('../knex');

module.exports = {
  async uploadProfileImg(id, data) {
    return knex('users').where('id', id).update('profile_image', data, '*').then(user => user[0]);
  }
}
