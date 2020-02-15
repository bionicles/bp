import { parseDisplayName } from "tools/parse-display-name";
import { queryPg } from "tools/db";

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
const readUser = queryPg({
  parse: req => [
    "select id, display_name, email from users where display_name = $1",
    parseDisplayName(req)
  ],
  respond: ({ rows }, res) => res.status(200).json(rows[0])
});

/**
 * Update a user
 *
 * @path {PATCH} /users/{displayName}
 * @example
 * ```js
 * const updateUserResponse = await fetch(`${url}/users/bender`, {
 *  method: "PATCH",
 *  body: { tags: ["alcoholic", "robot"] }
 * })
 * ```
 * @memberof Users
 * @query {string} displayName
 * @body {*} values - to be updated
 * @auth session cookie - users can only update themselves
 */
const updateUser = queryPg({
  parse: ({ body, query }) => {
    var values = [req.query.displayName];
    var columns = [];
    var dollars = [];
    forEachObjIndexed((k, v, i) => {
      if (k in whitelistedKeys && isValid(v)) {
        columns.push(columnNames[k]);
        dollars.push(`$${index + 2}`);
        values.push(v);
      }
    }, req.body);
    const query = `update users set (${columns}) values (${dollars}) where displayName = $1 returning *`;
    return [query, values];
  }
});

/**
 * Users can only delete their own accounts.
 *
 * @path {DELETE} /users/{displayName}
 * @memberof Users
 * @query {string} displayName - the user to delete
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
  parse: req => [req.query.displayName],
  query: "delete from app.users where display_name = $1",
  respond: ({ res }) => res.status(200).send("User deleted.")
});

const usersDisplayNameRoute = async (req, res) => {
  switch (req.method) {
    case "GET": {
      return readUser(req, res);
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
