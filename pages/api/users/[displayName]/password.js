import bcrypt from "bcrypt";

import { queryPg } from "tools/db/query";

/**
 * Users change their passwords (if logged in)
 *
 * @path {POST} /users/[displayName]/password
 * @example
 * ```js
 * const changeResponse = await fetch(`${url}/api/users/bender/password`, {
 *  method: "POST",
 *  body: { password: "kiss my shiny metal axe", newPassword: "remember me" }
 * });
 * // changeResponse.status === 200;
 * ```
 * @arg {string} req.body.newPassword
 * @code {400} unauthorized or invalid password
 * @code {200} password changed
 * @code {500} server error
 */
export default queryPg({
  parse: async ({ query: { displayName }, body: { newPassword } }) => {
    if (!newPassword || newPassword.length < 8) {
      throw Error("Invalid password");
    }
    const hash = await bcrypt.hash(newPassword, 10);
    return [hash, displayName];
  },
  query: "update users set pw = $1 where display_name = $2",
  respond: async ({ rows }, res) => {
    if (rows.length === 0) throw Error("Failed to change password.");
    return res.status(200).send("Password changed.");
  }
});
