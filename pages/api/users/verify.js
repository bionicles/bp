import { setSession } from "tools/session";
import { queryPg } from "tools/db/query";
/**
 * @name Verify Email
 * @path {POST} /users/verify
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
const verifyEmail = queryPg({
  parse: ({ body: { email, code } }) => [email, code],
  query:
    "update app.users set email_verified = true where email = $1 and code = $2 returning *",
  respond: async ({ result: { rows }, res }) => {
    if (rows.length === 0) throw Error("Verification failed.");
    const resWithSession = await setSession(res, rows[0]);
    return resWithSession.status(200).send(`Verified ${rows[0].email}.`);
  }
});

export default verifyEmail;
