import { setSession } from "tools/session";
import db from "tools/db/query";

/**
 * @path {POST} /users/verify
 * @memberof Users
 * @example
 * ```js
 * const verifyResponse = await fetch(`${url}/users/verify`, {
 *   method: "POST",
 *   body: { email: "bender@planetexpress.com", code: 123456 }
 * });
 * verifyResponse.status === 200;
 * ```
 * @body {string} email
 * @body {string} code
 * @code {400} Invalid request
 * @code {500} Server error
 * @code {200} Success
 * @returns Secure HTTP-Only JWT Session Cookie
 */
const verify = db.query({
  parse: ({ body: { email, code } }) => [
    "update app.users set email_verified = true where email = $1 and code = $2 returning *",
    [email, code]
  ],
  respond: async ({ result: { rows }, res }) => {
    if (rows.length === 0) throw Error("Verification failed.");
    const resWithSession = await setSession(res, rows[0]);
    return resWithSession.status(200).send(`Verified ${rows[0].email}.`);
  }
});

export default verify;
