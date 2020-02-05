import { DB_URL } from "tools";
const bcrypt = require("bcrypt");
const { Pool } = require("pg");

const pool = new Pool();

export default (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const { email, password } = req.body;

  pool.connect(DB_URL, (err, client, done) => {
    if (err) {
      res.status(503);
      return res.end(JSON.stringify(err));
    }
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        res.status(503);
        return res.end(JSON.stringify(err));
      }
      const query =
        "INSERT INTO users(email, password) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING";
      client.query(query, [email, hashedPassword], (err, result) => {
        done(); // close the db connection
        res.status(200);
        return err
          ? res.end(JSON.stringify(err))
          : res.end(JSON.stringify(result));
      });
    });
  });
};

// blank
// export default function create(user, callback) {
//   // This script should create a user entry in your existing database. It will
//   // be executed when a user attempts to sign up, or when a user is created
//   // through the Auth0 dashboard or API.
//   // When this script has finished executing, the Login script will be
//   // executed immediately afterwards, to verify that the user was created
//   // successfully.
//   //
//   // The user object will always contain the following properties:
//   // * email: the user's email
//   // * password: the password entered by the user, in plain text
//   // * tenant: the name of this Auth0 account
//   // * client_id: the client ID of the application where the user signed up, or
//   //              API key if created through the API or Auth0 dashboard
//   // * connection: the name of this database connection
//   //
//   // There are three ways this script can finish:
//   // 1. A user was successfully created
//   //     callback(null);
//   // 2. This user already exists in your database
//   //     callback(new ValidationError("user_exists", "my error message"));
//   // 3. Something went wrong while trying to reach your database
//   //     callback(new Error("my error message"));

//   const msg =
//     "Please implement the Create script for this database connection " +
//     "at https://manage.auth0.com/#/connections/database";
//   return callback(new Error(msg));
// }
