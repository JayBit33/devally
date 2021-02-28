
SELECT * FROM users WHERE users.account_types ->> 0 = 'developer' or users.account_types ->> 1 = 'developer' ;
// return knex('users').whereRaw("users.account_types ->> 0 = 'developer' or users.account_types ->> 1 = 'developer'");

use with objects
select json_each(notification_settings) from users where users.id = 3

get all object keys
select json_object_keys(notification_settings) from users where users.id = 3

get the type
select json_typeof (notification_settings) from users
