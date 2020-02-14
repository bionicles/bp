import { getSession } from "tools/session";
import { pgConfig } from "tools/db/config";
import { Pool } from "pg";

const pool = new Pool(pgConfig);

/**
 * Meta-program a PostgreSQL Route w/ requester_id set in local variables for row level security
 *
 * @name queryPg
 * @example
 * ```js
 * const routeHandler = queryPg({
 *  parse: req => {
 *    const valid = ajv.validate(schema, req.body);
 *    if (!valid) throw Error(ajv.errors);
 *    return [req.body.prop1, req.body.prop2]
 *  },
 *  query: "insert into stuff (prop1, prop2) values ($1, $2) returning *",
 *  respond: ({ req, result, res}) => result.rows[0] ? res.status(200).json(result.rows[0]) : throw Error("insert failed", req, result)
 * })
 * ```
 * @arg {Function} parse - validate the request and throw error or return a list of query params
 * @arg {string} query - SQL string to execute with $1, $2 etc query params from parse function
 * @arg {Function} respond - function({ req, result, res}) to send db output to client (or not!)
 * @throws {Error} parse and respond can throw errors to send em back to the client
 * @code {200} success - result of "respond" function
 * @returns {Response} res - the response for a query
 */
export const queryPg = ({ parse, query, respond }) => async (req, res) => {
  try {
    const { id, displayName } = getSession(req);
    const client = await pool.connect();
    if (!client) {
      throw Error("Failed to connect to database.");
    }
    const parsedInputs = parse(req);
    const wrappedQuery = `
begin;
set local requester_display_name = ${displayName};
set local requester_id = ${id};
${query};
commit;`;
    const result = await client.query(wrappedQuery, parsedInputs);
    return respond({ req, result, res });
  } catch (error) {
    return res.status(500).json({ error });
  } finally {
    await pool.end();
  }
};
