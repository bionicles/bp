// github.com/zeit/next.js/blob/master/examples/api-routes-middleware/utils/cookies.js
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

/**
 * Sign and set the user session cookie
 *
 * @name setSession
 * @example ``` const resWithSession = setSession(res, user);
 * @arg {object} res - response object
 * @arg {object} user - data for this requester (id, displayName)
 * @arg {object} [options={ httpOnly: true, secure: true }]
 * @arg res
 * @arg user
 * @arg options
 * @arg res
 * @arg user
 * @arg options
 * @arg res
 * @arg user
 * @arg options
 * @arg res
 * @arg user
 * @arg options
 * @arg res
 * @arg user
 * @arg options
 * @arg res
 * @arg user
 * @arg options
 * @arg res
 * @arg user
 * @arg options
 * @arg res
 * @arg user
 * @arg options
 * @arg res
 * @arg user
 * @arg options
 * @arg res
 * @arg user
 * @arg options
 */
export const setSession = async (
  res,
  user,
  options = { httpOnly: true, secure: true }
) => {
  const value = { id: user.id };
  const session = await jwt.sign(value, process.env.SESSION_COOKIE_SECRET, {
    algorithm: "RS256",
    expiresIn: "2 days"
  });
  res.setHeader("Set-Cookie", serialize("session", session, options));
  return res;
};

/**
 * Verify and retrieve user session data
 *
 * @name getSession
 * @example ```js const resWithUser = await getSession(req);
 * @arg {object} req - request object
 * @returns {object} req w/ req.user object set (might be anon)
 * @arg req
 * @arg req
 * @arg req
 * @arg req
 * @arg req
 * @arg req
 * @arg req
 * @arg req
 * @arg req
 * @arg req
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
  return req;
};
