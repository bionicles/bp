const { Pool } = require("pg");

// GET
const query =
  "SELECT id, display_name, email FROM users WHERE display_name = $1";
const pool = new Pool();

export default async (req, res) => {
  const { display_name } = req.body;
  const client = await pool.connect();
  if (!client) {
    return res.status(503).send("Failed to connect to database.");
  }
  try {
    const queryResult = client.query(query, [email]);
    if (queryResult.rows.length === 0) {
      return res.status(404).send("User not found.");
    }
    res.setHeader("Content-Type", "application/json");
    return res.status(200).send(queryResult.rows[0]);
  } catch (err) {
    return res.status(403).send(`Failed to execute database query: ${err}`);
  } finally {
    await pool.end();
  }
};

// DELETE
import { getUserId } from "tools";
import { Pool } from "pg";

const query = "DELETE FROM users WHERE id = $1";
const pool = new Pool();

export default async (req, res) => {
  const id = getUserId(req);
  if (!id) {
    return res.status(403).send("Invalid id. Are you signed in?");
  }
  const client = await pool.connect();
  if (!client) {
    return res.status(503).send("Failed to connect to database.");
  }
  try {
    await client.query(query, [id]);
    return res.status(200).send(`Deleted user ${id}`);
  } catch (err) {
    return res.status(500).send("Failed to execute database query.");
  }
};
