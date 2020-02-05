import { DB_URL } from "tools";
const postgres = require("pg");

export function remove(id, callback) {
  postgres.connect(DB_URL, function(err, client, done) {
    if (err) return callback(err);

    const query = "DELETE FROM users WHERE id = $1";
    client.query(query, [id], function(err) {
      // NOTE: always call `done()` here to close
      // the connection to the database
      done();

      return callback(err);
    });
  });
}

// export default function remove(id, callback) {
//   // This script remove a user from your existing database.
//   // It is executed whenever a user is deleted from the API or Auth0 dashboard.
//   //
//   // There are two ways that this script can finish:
//   // 1. The user was removed successfully:
//   //     callback(null);
//   // 2. Something went wrong while trying to reach your database:
//   //     callback(new Error("my error message"));

//   const msg =
//     "Please implement the Delete script for this database " +
//     "connection at https://manage.auth0.com/#/connections/database";
//   return callback(new Error(msg));
// }
