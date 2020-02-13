const isEmail = require("validator/es/lib/isEmail");
const bcrypt = require("bcrypt");

const parseGetIn = 
const handleGet = queryPg(parseGetIn, GetQuery, parseGetOut);

/**
 * @name Parse Post Users Inputs
 * @param {String} req.displayName - public label for a new user
 * @returns {Array} query parameters for Insert User query
 * @throws {Error} if displayName is invalid
 */
const parsePostIn = req => {
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

const postQuery =
  "INSERT INTO users(username, email, password) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING";

const parsePostOut = (result, res) => {
  const { id } = queryResult.rows[0];
  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({ id, username, email });
}

const handlePost = queryPg(parsePostIn, postQuery, parsePostOut);

/**
 * 
 */
export default (req, res) => {
  switch (req.method) {
    case 'GET': return handleGet(req, res);
    case 'POST': return handlePost(req, res);
    default: return res.status(400).send(`${req.method} unsupported on /users`)
  }
}