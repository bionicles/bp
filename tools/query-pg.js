import { getSession } from "tools/session";
import { pgConfig } from "tools/db/config";
import { Pool } from "pg";

const pool = new Pool(pgConfig);

/**
 * @name Query PostgreSQL w/ user's data in local variables
 * @param {Function} parseIn - function(req) parses req object and returns db query params
 * @param {String} query - SQL command string to execute with $1, $2 etc for inputs
 * @param {Function} parseOut - function(result, res) parses result and responds to client
 * @returns {Response} response from parseOut on result of query w/ inputs from parseIn on req
 * @returns {Response} status 500 with error if anything fails
 */
export const queryPg = (parseIn, query, parseOut) => async (req, res) => {
  try {
    const { id, displayName } = getSession(req);
    const client = await pool.connect();
    if (!client) {
      throw Error("Failed to connect to database.");
    }
    const parsedInputs = parseIn(req);
    const wrappedQuery = `
begin;
set local requester_display_name = ${displayName};
set local requester_id = ${id};
${query};
commit;`;
    const result = await client.query(wrappedQuery, parsedInputs);
    return parseOut(result, res);
  } catch (error) {
    return res.status(500).json({ error });
  } finally {
    await pool.end();
  }
};
