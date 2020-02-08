import { pgConfig, getRequesterId } from "tools";
import { Pool } from "pg";

const pool = new Pool(pgConfig);

const wrap = (query, requester_id) => `
begin;
set local requester_id = ${requester_id};
${query};
commit;
`;

export const queryPg = (parseIn, query, parseOut) => async (req, res) => {
  try {
    const requester_id = getRequesterId(req);
    const client = await pool.connect();
    if (!client) {
      throw Error("Failed to connect to database.");
    }
    const parsedInputs = parseIn(req);
    const wrappedQuery = wrap(query, requester_id);
    const result = await client.query(wrappedQuery, parsedInputs);
    return parseOut(result, res);
  } catch (error) {
    return res.status(500).json({ error });
  } finally {
    await pool.end();
  }
};
