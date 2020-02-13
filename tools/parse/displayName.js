/**
 * Parse displayName from the request
 * ```js
 * const inputs = parseDisplayName(req);
 * // inputs = ["bender"]
 * ```
 * @arg {String} req.params.displayName
 * @throws {Error} if no displayName
 * @returns {String} displayName
 */
export const parseDisplayName = ({ query: { displayName } }) => {
  if (!displayName) throw Error("Invalid displayName");
  return [displayName];
};
