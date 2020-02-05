export function verify(email, callback) {
  //this example uses the "pg" library
  //more info here: https://github.com/brianc/node-postgres

  const postgres = require("pg");

  const conString = "postgres://user:pass@localhost/mydb";
  postgres.connect(conString, function(err, client, done) {
    if (err) return callback(err);

    const query =
      "UPDATE users SET email_Verified = true WHERE email_Verified = false AND email = $1";
    client.query(query, [email], function(err, result) {
      // NOTE: always call `done()` here to close
      // the connection to the database
      done();

      return callback(err, result && result.rowCount > 0);
    });
  });
}

// blank
// export default function verify(email, callback) {
//   // This script should mark the current user's email address as verified in
//   // your database.
//   // It is executed whenever a user clicks the verification link sent by email.
//   // These emails can be customized at https://manage.auth0.com/#/emails.
//   // It is safe to assume that the user's email already exists in your database,
//   // because verification emails, if enabled, are sent immediately after a
//   // successful signup.
//   //
//   // There are two ways that this script can finish:
//   // 1. The user's email was verified successfully
//   //     callback(null, true);
//   // 2. Something went wrong while trying to reach your database:
//   //     callback(new Error("my error message"));
//   //
//   // If an error is returned, it will be passed to the query string of the page
//   // where the user is being redirected to after clicking the verification link.
//   // For example, returning `callback(new Error("error"))` and redirecting to
//   // https://example.com would redirect to the following URL:
//   //     https://example.com?email=alice%40example.com&message=error&success=false

//   const msg =
//     "Please implement the Verify script for this database connection " +
//     "at https://manage.auth0.com/#/connections/database";
//   return callback(new Error(msg));
// }
