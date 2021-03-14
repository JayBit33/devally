// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      // filename: 'postgres://localhost/devally-main'
      host: '127.0.0.1',
      user: 'postgres',
      password: 'password',
      database: 'devally-main'
    }
  },

  test: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'Xeroxparc33',
      database: 'test-devally-main'
    }
  },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'devally-main',
  //     user:     'postgres',
  //     password: 'Xeroxparc33'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }
};
