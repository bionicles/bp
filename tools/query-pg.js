const isEmail = require("validator/es/lib/isEmail");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");

import { pgConfig } from "tools";
const pool = new Pool(pgConfig);

export const queryPg = (parseIn, query, parseOut) => async (req, res) => {
  try {
    const client = await pool.connect();
    if (!client) {
      throw Error("Failed to connect to database.");
    }
    const parsedInputs = parseIn(req);
    const result = await client.query(query, parsedInputs);
    return parseOut(result, res);
  } catch (error) {
    return res.status(500).json({ error });
  } finally {
    await pool.end();
  }
};
