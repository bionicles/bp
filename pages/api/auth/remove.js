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
