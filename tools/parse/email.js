const Ajv = require("ajv");
const ajv = new Ajv();

var validateEmail = ajv.compile({ properties: { email: { type: "email" } } });

/**
 * @example ```js const inputs = parseEmail(req);
 * @arg {String} req - a request object
 * @throws "Invalid email." - if email invalid
 * @returns inputs - an array with 1 email
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
export const parseEmail = async req => {
  const valid = await validateEmail(req.body);
  if (!valid) throw Error(validateEmail.errors);
  return [req.body.email];
};
