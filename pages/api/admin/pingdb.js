import db from "tools/db";

/**
 * Test integration with postgresql with 'select now();'
 *
 * @path {GET} /admin/pingdb
 * @example
 * ```js
 * const pingDbResponse = await fetch(`${url}/admin/pingdb`)
 * console.log(pingDbResponse.status) // => 200 if api-db connection works
 * ```
 * @code {200} success - the api can talk to the database
 * @code {500} failure - the api-db connection failed
 */
const pingDb = db.query({
  parse: () => ["select now();"],
  respond: ({ result, res }) => res.status(200).json(result.rows[0])
});

export default pingDb;
