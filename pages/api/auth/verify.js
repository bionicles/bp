import isEmail from "validator/es/lib/isEmail";
import { setCookie } from "~/tools"

const parseIn = req => {
  const { email } = req.body;
  if (!isEmail(email)) throw Error("Invalid email.");
  return [email];
};

const query =
  "update app.users set email_verified = true where email = $1 returning id";

const parseOut = (result, res) => {

  if (result.rows.length === 0) {
    throw Error("Email verification failed.")
  }
  const session = await makeJwt(result.rows[0])
  res
    .status(200)
    .cookie("session", session)
    .send("Verified email.");
};

export default queryPg(parseIn, query, parseOut);
