import { sendVerificationEmail } from "tools/send-verification-email";
import { getCodeAndExpiry } from "tools/get-code-and-expiry";
const bcrypt = require("bcrypt");

/**
 * @module /users
 */
export default (req, res) => {
  switch (req.method) {
    /**
     * List users
     * @path {GET} /users
     * @response {Array} Users
     */
    case 'GET': {
      return queryPg({
        parse: () => [],
        query: 'select * from users limit 10;',
        respond: ({rows}, res) => rows.length > 0 ? res.status(200).json(rows) : res.status(500).send("List users failed.")
      })
    };
    /**
     * @name SignUp
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
    case 'POST': {
      return queryPg({
      parse: ({ body: { displayName, email, password }}) => {
        if (!displayName) throw Error("No displayName");
        if (!isinstance(displayName, string)) throw Error("displayName must be a string");
        if (displayName.length < 3) throw Error("displayName must be at least 3 characters")
        if (!isEmail(email)) throw Error("Invalid email.");
        const hash = await bcrypt.hash(password, 10);
        if (!hash) throw Error("Failed to hash password.");
        const { code, expiry } = getCodeAndExpiry();
        return [displayName, email, hash, code, expiry]
      },
      query: "insert into users(display_name, email, pw, code, expiry) values ($1, $2, $3, $4, $5) returning (id, display_name, email, code) on conflict (display_name, email) do nothing",
      respond: async ({ result: { rows }, res }) => {
        if (rows.length === 0) throw Error("User not created.")
        const { id, display_name: displayName, email, code } = rows[0]
        await sendVerificationEmail(email, code);
        return res.status(200).json({ id, displayName, email });
      }
    });
  };
    default: return res.status(400).send(`${req.method} unsupported on /users`)
  }
}