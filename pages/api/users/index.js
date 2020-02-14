import { sendVerificationEmail } from "tools/send-verification-email";
import { isValidDisplayName } from "tools/parse/display-name";
import { getCodeAndExpiry } from "tools/get-code-and-expiry";
import { queryPg } from "tools/db/query";
const bcrypt = require("bcrypt");
const Ajv = require("ajv");
var ajv = new Ajv();
ajv.addKeyword("displayName", {
  validate: (_, data) => isValidDisplayName(data),
  errors: false
});

/**
 * @module /users
 * @example ```jsx const users = fetch("/users");```
 * @arg {object} req - the request from the user
 * @arg {object} res - a response object
 */
export default (req, res) => {
  switch (req.method) {
    /**
     * List users
     *
     * @path {GET} /users
     * @response {array} Users
     */
    case "GET": {
      return queryPg({
        parse: () => [],
        query: "select * from users limit 10;",
        respond: ({ rows }, res) =>
          rows.length > 0
            ? res.status(200).json(rows)
            : res.status(500).send("List users failed.")
      });
    }
    /**
     * Sign up
     *
     * @path {POST} /users
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
    case "POST": {
      return queryPg({
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
          return [displayName, email, hash, code, expiry];
        },
        query:
          "insert into users(display_name, email, pw, code, expiry) values ($1, $2, $3, $4, $5) returning (id, display_name, email, code) on conflict (display_name, email) do nothing",
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
    }
    default:
      return res.status(400).send(`${req.method} unsupported on /users`);
  }
};
