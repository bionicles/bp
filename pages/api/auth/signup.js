const isEmail = require("validator/es/lib/isEmail");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
import { pgConfig } from "tools";

const query =
  "INSERT INTO users(email, password) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING";
const pool = new Pool(pgConfig);

export default async (req, res) => {
  const { email, password } = req.body;
  if (!isEmail(email)) {
    return res.status(403).send("Invalid email.");
  }
  const client = await pool.connect();
  if (!client) {
    return res.status(503).send("Failed to connect to database.");
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      return res.status(500).send("Failed to hash password.");
    }
    const queryResult = await client.query(query, [email, hashedPassword]);
    const { id } = queryResult.rows[0];
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({ id, email });
  } catch (err) {
    return res.status(500).send(`Failed to execute database query: ${err}`);
  } finally {
    await pool.end();
  }
};
