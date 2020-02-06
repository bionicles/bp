// github.com/zeit/next.js/blob/master/examples/api-routes-middleware/utils/cookies.js
import { serialize } from "cookie";

/**
 * set `cookie` on `res` object
 */
const cookie = (res, name, value, options = {}) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  if ("maxAge" in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  res.setHeader("Set-Cookie", serialize(name, String(stringValue), options));
};

/**
 * Add `cookie` function to `res.cookie`
 */
const cookies = handler => (req, res) => {
  res.cookie = (name, value, options) => cookie(res, name, value, options);

  return handler(req, res);
};

export default cookies;
