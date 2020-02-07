import isEmail from "validator/es/lib/isEmail";
import { cookies } from "tools";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");

const query =
  "SELECT id, nickname, email, password FROM users WHERE email = $1";
const pool = new Pool();

const signIn = async (req, res) => {
  const { email, password: passwordInput } = req.body;
  if (!isEmail(email)) {
    return res.status(403).send("Invalid email.");
  }
  if (!passwordInput) {
    return res.status(403).send("Invalid password.");
  }
  const client = await pool.connect();
  if (!client) {
    return res.status(503).send("Failed to connect to database.");
  }
  try {
    const queryResult = await client.query(query, [email]);
    if (queryResult.rows.length === 0) {
      return res.status(404).send("User not found.");
    }
    const { id, password } = queryResult.rows[0];
    const match = await bcrypt.compare(passwordInput, password);
    if (!match) {
      return res.status(403).send("Password does not match.");
    }
    const token = await jwt.sign({ id }, process.env.JWT_RSA_PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: "2 days"
    });
    res.cookie("token", token);
    res.status(200).json({ id });
  } catch (err) {
    return res.status(500).send("Failed to execute database query.");
  } finally {
    await pool.end();
  }
};

export default cookies(signIn);
