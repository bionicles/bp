const rTest = require("ramda/test");
// const Ajv = require("ajv");
// var ajv = new Ajv();

/**
 * Check if a displayName is valid
 *
 * @name isValidDisplayName
 * @example ```js const valid = isValidDisplayName(displayName);
 * @arg {string} displayName - a candidate display name
 * @returns {boolean} whether the display name is valid
 */
export const isValidDisplayName = rTest(
  /^[a-zA-Z0-9]+([-]?[a-zA-Z0-9]){2,39}$/
);

/**
 * Parse displayName from a Query
 *
 * @name parseDisplayName
 * @example
 * ```js
 * const inputs = parseDisplayName(req);
 * // inputs = ["bender"]
 * ```
 * @arg {string} req - request object
 * @prop {string} req.query.displayName - displayName
 * @throws {Error} if no displayName
 * @returns {string} displayName
 */
export const parseDisplayName = ({ query: { displayName } }) => {
  if (!displayName || !isValidDisplayName(displayName)) {
    throw Error("Invalid displayName");
  }
  return [displayName];
};

// add "displayName" to ajv
// ajv.addKeyword("displayName", {
//   validate: (_, data) => isValidDisplayName(data),
//   errors: false
// });

// var displayNameValidator = ajv.compile({
//   properties: { displayName: { type: "displayName" } }
// });
