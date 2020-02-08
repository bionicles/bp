import isEmail from "validator/es/lib/isEmail";
const { Pool } = require("pg");

const query = "SELECT id, nickname, email FROM users WHERE email = $1";
const pool = new Pool();

export default async (req, res) => {
  const { email } = req.body;
  if (!isEmail(email)) {
    return res.status(403).send("Invalid or missing email.");
  }
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
