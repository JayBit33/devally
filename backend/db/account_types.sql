
SELECT * FROM users WHERE users.account_types ->> 0 = 'developer' or users.account_types ->> 1 = 'developer' ;
// return knex('users').whereRaw("users.account_types ->> 0 = 'developer' or users.account_types ->> 1 = 'developer'");