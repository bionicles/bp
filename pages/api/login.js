const bcrypt = require("bcrypt");
const Ajv = require("ajv");
const ajv = new Ajv();

import { setSession } from "tools/session";
import { queryPg } from "tools/db/query";

/**
 * @path {POST} /login
 * @body {string} email
 * @body {string} password - 8+ characters
 * @code {400} invalid request
 * @code {500} server error
 * @code {200} success
 * @response {string} displayName
 */
const login = queryPg({
  parse: async req => {
    if (req.method !== "POST") throw Error("Use POST /login");
    const valid = ajv.validate(
      {
        properties: {
          email: { type: "email" },
          password: { type: "string", minLength: 8 }
        }
      },
      req.body
    );
    if (!valid) throw Error(ajv.errors);
    return [req.body.email, req.body.password];
  },
  query:
    "SELECT id, display_name, abstract, email, password FROM users WHERE email = $1",
  respond: async ({ req, result, res }) => {
    const user = result.rows[0];
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(403).send("Password does not match.");
    const resWithSession = await setSession(res, user);
    return resWithSession.status(200).json({
      id: user.id,
      displayName: user.display_name,
      abstract: user.abstract,
      email: user.email
    });
  }
});

export default login;
