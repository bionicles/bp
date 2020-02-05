export function loginByEmail(email, callback) {
  const postgres = require("pg");

  const conString = "postgres://user:pass@localhost/mydb";
  postgres.connect(conString, function(err, client, done) {
    if (err) return callback(err);

    const query = "SELECT id, nickname, email FROM users WHERE email = $1";
    client.query(query, [email], function(err, result) {
      // NOTE: always call `done()` here to close
      // the connection to the database
      done();

      if (err || result.rows.length === 0) return callback(err);

      const user = result.rows[0];

      return callback(null, {
        user_id: user.id,
        nickname: user.nickname,
        email: user.email
      });
    });
  });
}

// export default function getByEmail(email, callback) {
//   // This script should retrieve a user profile from your existing database,
//   // without authenticating the user.
//   // It is used to check if a user exists before executing flows that do not
//   // require authentication (signup and password reset).
//   //
//   // There are three ways this script can finish:
//   // 1. A user was successfully found. The profile should be in the following
//   // format: https://auth0.com/docs/users/normalized/auth0/normalized-user-profile-schema.
//   //     callback(null, profile);
//   // 2. A user was not found
//   //     callback(null);
//   // 3. Something went wrong while trying to reach your database:
//   //     callback(new Error("my error message"));

//   const msg =
//     "Please implement the Get User script for this database connection " +
//     "at https://manage.auth0.com/#/connections/database";
//   return callback(new Error(msg));
// }
