// github.com/zeit/next.js/blob/master/examples/api-routes-middleware/utils/cookies.js
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

/**
 * Set a Secure / HTTP Only session token
 * @name Set Session
 * @param {Response} res response object
 * @param {Object} value what shall be saved in the session
 * @param {String} value.id primary key for user
 * @param {String} value.displayName visible label for user
 * @param {*} options
 */
export const setSession = async (
  res,
  value,
  options = { httpOnly: true, secure: true }
) => {
  const session = await jwt.sign(value, process.env.SESSION_COOKIE_SECRET, {
    algorithm: "RS256",
    expiresIn: "2 days"
  });
  res.setHeader("Set-Cookie", serialize("session", session, options));
  return res;
};

/**
 * Verify session user JWT and get its' data
 * @name Get session user data
 * @param {Request} req
 * @returns {Request} req w/ user.id String + user.displayName string
 */
export const getSession = async req => {
  let user = { id: "anon", displayName: "Anon" };
  if (req.cookies.session) {
    const { id, displayName } = await jwt.verify(
      req.cookies.session,
      process.env.SESSION_COOKIE_SECRET
    );
    user = { id, displayName };
  }
  req.user = user;
  return req.user;
};
