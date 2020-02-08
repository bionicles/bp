const isEmail = require("validator/es/lib/isEmail");
const bcrypt = require("bcrypt");

const parseIn = req => {
  const { username, email, password } = req.body;
  if (!username) throw Error("No username");
  if (!isinstance(username, string)) throw Error("username must be a string");
  if (username.length < 3) throw Error("username must be at least 3 characters")
  if (!isEmail(email)) throw Error("Invalid email.");
  const hash = await bcrypt.hash(password, 10);
  if (!hash) throw Error("Failed to hash password.");
  const inputs = [username, email, hash]
  return inputs
}

const query =
  "INSERT INTO users(username, email, password) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING";

const parseOut = (result, res) => {
  const { id } = queryResult.rows[0];
  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({ id, username, email });
}

export default queryPg(parseIn, query, parseOut);