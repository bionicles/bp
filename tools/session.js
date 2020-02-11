// github.com/zeit/next.js/blob/master/examples/api-routes-middleware/utils/cookies.js
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

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
};

export const getSession = async req => {
  let requester_id = "anon";
  if (req.cookies.session) {
    const { id } = await jwt.verify(
      req.cookies.token,
      process.env.SESSION_COOKIE_SECRET
    );
    requester_id = id;
  }
  return requester_id;
};
