import { parseDisplayName } from "tools/parse-display-name";
import { queryPg } from "tools/db/query";

/**
 * Most data is shown to this user only.
 *
 * @path {GET} /users/{displayName}
 * @memberof Users
 * @example
 * ```js
 * const { status, body } = await fetch(`${url}/users/bender`);
 * console.log(status, body) => 200, { displayName: "bender" };
 * ```
 * @auth session cookie (most user data is private)
 * @response {User} data available to the requester
 */
const getUser = queryPg({
  parse: parseDisplayName,
  query: "SELECT id, display_name, email FROM users WHERE display_name = $1",
  respond: ({ rows }, res) => res.status(200).json(rows[0])
});

/**
 * Users can only delete their own accounts.
 *
 * @path {DELETE} /users/{displayName}
 * @memberof Users
 * @query {String} displayName - the user to delete
 * @example
 * ```js
 * const { status } = await fetch(`${url}/users/bender`, { method: "DELETE" });
 * console.log(status, body) => 200, "bender deleted"; (only if logged in as bender)
 * ```
 * @code {200} user deleted
 * @code {400} unauthorized
 * @code {500} server error
 * @auth session cookie
 */
const deleteUser = await queryPg({
  parse: parseDisplayName,
  query: "DELETE FROM users WHERE displayName = $1",
  respond: ({ res }) => res.status(200).send("User deleted.")
});

const usersDisplayNameRoute = async (req, res) => {
  switch (req.method) {
    case "GET": {
      return getUser(req, res);
    }
    case "DELETE": {
      return deleteUser(req, res);
    }
    default: {
      res
        .status(400)
        .send(`Method: ${req.method} unsupported on /users/[displayName]`);
    }
  }
};

export default usersDisplayNameRoute;
