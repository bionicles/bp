import { sendVerificationEmail } from "tools/send-verification-email";
import { isValidDisplayName } from "tools/parse/display-name";
import { getCodeAndExpiry } from "tools/get-code-and-expiry";
import db from "tools/db";
const bcrypt = require("bcrypt");
const Ajv = require("ajv");
var ajv = new Ajv();
ajv.addKeyword("displayName", {
  validate: (_, data) => isValidDisplayName(data),
  errors: false
});

/** @namespace */
var Users = {};

/**
 * List users
 *
 * @path {GET} /users
 * @response {array} Users
 * @memberof Users
 * @example
 * ```js
 * const users = await fetch(`${url}/users);
 * ```
 */
const listUsers = db.query({
  parse: () => ["select * from users limit 10;", []],
  respond: ({ rows }, res) =>
    rows.length > 0
      ? res.status(200).json(rows)
      : res.status(500).send("List users failed.")
});

/**
 * Sign up
 *
 * @path {POST} /users
 * @memberof Users
 * @example
 * ```js
 * const signUpResponse = await fetch(`${url}/users`, {
 *  method: "POST",
 *  body: {
 *    displayName: "Bender", // <--- displayName is public
 *    email: "bender@planetexpress.com", // <--- email is private
 *    password: "good news everyone"
 *  }
 * });
 * // signUpResponse.status === 200;
 * ```
 * @body {string} displayName - a public name
 * @body {string} password - at least 8 characters
 * @body {string} email - kept private
 * @code {200} Success
 * @code {400} Invalid request
 * @code {500} Server Error
 * @returns session cookie
 */
const signUp = db.query({
  parse: async ({ body }) => {
    const valid = await ajv.validate(
      {
        properties: {
          displayName: { type: "displayName" },
          email: { type: "email" },
          password: { type: "string" }
        }
      },
      body
    );
    if (!valid) throw Error(ajv.errors);
    const { displayName, email, password } = body;
    const hash = await bcrypt.hash(password, 10);
    if (!hash) throw Error("Failed to hash password.");
    const { code, expiry } = getCodeAndExpiry();
    const query =
      "insert into users(display_name, email, pw, code, expiry) values ($1, $2, $3, $4, $5) returning (id, display_name, email, code) on conflict (display_name, email) do nothing";
    const values = [displayName, email, hash, code, expiry];
    return [query, values];
  },
  respond: ({ result: { rows }, res }) => {
    if (rows.length === 0) throw Error("User not created.");
    const {
      id,
      display_name: { displayName },
      email,
      code
    } = rows[0];
    sendVerificationEmail(email, code);
    return res.status(200).json({ id, displayName, email });
  }
});

export default (req, res) => {
  switch (req.method) {
    case "GET":
      return listUsers(req, res);
    case "POST":
      return signUp(req, res);
    default:
      return res.status(400).send(`${req.method} unsupported on /users`);
  }
};
