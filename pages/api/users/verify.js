import { setSession } from "tools/session"

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
  parse: ({body: { email, code }}) => ([email, code]), 
  query: "update app.users set email_verified = true where email = $1 and code = $2 returning id, display_name", 
  respond: ({result, res}) => {
    if (rows.length === 0) throw Error("Verification failed.")
    const res = await setSession(res, result.rows[0])
    return res.status(200).send(`Verified ${email}.`);
  }
});

export default verifyEmail;