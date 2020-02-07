import isEmail from "validator/es/lib/isEmail";
import { Pool } from "pg";
const pool = new Pool();

const query =
  "UPDATE users SET email_verified = true WHERE email_verified = false AND email = $1";

export default async (req, res) => {
  const { email } = req.body;
  if (!isEmail(email)) {
    return res.status(403).send("Invalid email.");
  }
  const client = await pool.connect();
  if (!client) {
    return res.status(503).send("Failed to connect to database.");
  }
  try {
    await client.query(query, [email]);
    return res.status(200).send("Email verified.");
  } catch (err) {
    return res.status(500).send(`Failed to execute database query: ${err}`);
  } finally {
    await pool.end();
  }
};

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
