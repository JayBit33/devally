// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED

const knex = require('./knex');

module.exports = {
  uploadProfileImg(id, data) {
    return knex('users').where('id', id).update('profile_blob', data, '*').then(user => user[0]);
  }
}
