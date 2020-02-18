import { getSession } from "tools/session";
import { pgConfig } from "tools/db/config";
import getNow from "tools/get-now";
import { Pool } from "pg";

const pool = new Pool(pgConfig);

/**
 * Meta-program a PostgreSQL Route w/ requester_id set in local variables for row level security
 *
 * @example
 * ```js
 * const routeHandler = queryPg({
 *  parse: req => {
 *    const valid = ajv.validate(schema, req.body);
 *    if (!valid) throw Error(ajv.errors);
 *    const values = [req.body.prop1, req.body.prop2]
 *    return ["insert into stuff (prop1, prop2) values ($1, $2) returning *", values]
 *  },
 *  respond: ({ req, result, res}) => result.rows[0] ? res.status(200).json(result.rows[0]) : throw Error("insert failed", req, result)
 * })
 * ```
 * @arg {Function} parse - validate the request. throw error or return query string and values array
 * @arg {Function} respond - function({ req, result, res}) to send db output to client (or not!)
 * @throws {Error} parse and respond can throw errors to send em back to the client
 * @code {200} success - result of "respond" function
 * @returns {Response} res - the response for a query
 */
const transact = ({ parse, respond }) => async (reqNoUser, res) => {
  const req = await getSession(reqNoUser);
  const client = await pool.connect();
  const now = getNow();
  try {
    const [query, values] = await parse(req);
    await client.query("begin;");
    await client.query(`set local.requester_id = ${req.user.id};`);
    console.log(
      "user:",
      req.user.id,
      "query:",
      query,
      "values:",
      values,
      "at:",
      now
    );
    const result = await client.query(query, values);
    await client.query("commit;");
    return respond({ req, result, res });
  } catch (error) {
    await client.query("rollback;");
    return res.status(500).json({ error });
  } finally {
    await pool.end();
  }
};

export default {
  query: transact,
  simple: async (text, params) => await pool.query(text, params)
};
