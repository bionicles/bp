import { getSession } from "tools/session";
import { pgConfig } from "tools/db/config";
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
const transact = ({ parse, respond }) => async (req, res) => {
  try {
    const { id } = getSession(req);
    const client = await pool.connect();
    if (!client) throw Error("Failed to connect to db.");
    const [query, values] = await parse(req);
    await client.query("begin;");
    await client.query(`set local requester_id = ${id};`);
    await client.query(query, values);
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
  query: transact
};
