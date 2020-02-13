import { getSession } from "tools/session";
import { pgConfig } from "tools/db/config";
import { Pool } from "pg";

const pool = new Pool(pgConfig);

/**
 * @name Query PostgreSQL w/ requester_id in local variables for row level security
 * @arg {function} parse - validate the request and return inputs to the database
 * @arg {string} query - SQL string to execute with $1, $2 etc as inputs
 * @arg {function} respond - function({ req, result, res}) to send db output to client (or not!)
 * @code {200} response from parseOut on result of query w/ inputs from parseIn on req
 * @code {500} failure
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
