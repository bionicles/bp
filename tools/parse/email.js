/**
 * @arg {String} req.body.email - a valid email address
 * @throws "Invalid email." - if email invalid
 * @returns inputs - an array with 1 email
 */
export const parseEmail = req => {
  const { email } = req.body;
  if (!isEmail(email)) throw Error("Invalid email.");
  return [email];
};
