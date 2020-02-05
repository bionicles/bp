export function login(email, password, callback) {
  // "pg" https://github.com/brianc/node-postgres

  const bcrypt = require("bcrypt");
  const postgres = require("pg");

  const conString = "postgres://user:pass@localhost/mydb";
  postgres.connect(conString, function(err, client, done) {
    if (err) return callback(err);

    const query =
      "SELECT id, nickname, email, password FROM users WHERE email = $1";
    client.query(query, [email], function(err, result) {
      // NOTE: always call `done()` here to close
      // the connection to the database
      done();

      if (err || result.rows.length === 0)
        return callback(err || new Error("wrong username or password"));

      const user = result.rows[0];

      bcrypt.compare(password, user.password, function(err, isValid) {
        if (err || !isValid)
          return callback(err || new Error("wrong username or password"));

        return callback(null, {
          user_id: user.id,
          nickname: user.nickname,
          email: user.email
        });
      });
    });
  });
}

// blank
// export default function login(email, password, callback) {
//   // This script should authenticate a user against the credentials stored in
//   // your database.
//   // It is executed when a user attempts to log in or immediately after signing
//   // up (as a verification that the user was successfully signed up).
//   //
//   // Everything returned by this script will be set as part of the user profile
//   // and will be visible by any of the tenant admins. Avoid adding attributes
//   // with values such as passwords, keys, secrets, etc.
//   //
//   // The `password` parameter of this function is in plain text. It must be
//   // hashed/salted to match whatever is stored in your database. For example:
//   //
//   //     var bcrypt = require('bcrypt@0.8.5');
//   //     bcrypt.compare(password, dbPasswordHash, function(err, res)) { ... }
//   //
//   // There are three ways this script can finish:
//   // 1. The user's credentials are valid. The returned user profile should be in
//   // the following format: https://auth0.com/docs/users/normalized/auth0/normalized-user-profile-schema
//   //     var profile = {
//   //       user_id: ..., // user_id is mandatory
//   //       email: ...,
//   //       [...]
//   //     };
//   //     callback(null, profile);
//   // 2. The user's credentials are invalid
//   //     callback(new WrongUsernameOrPasswordError(email, "my error message"));
//   // 3. Something went wrong while trying to reach your database
//   //     callback(new Error("my error message"));
//   //
//   // A list of Node.js modules which can be referenced is available here:
//   //
//   //    https://tehsis.github.io/webtaskio-canirequire/

//   const msg =
//     "Please implement the Login script for this database connection " +
//     "at https://manage.auth0.com/#/connections/database";
//   return callback(new Error(msg));
// }
