const dayjs = require("dayjs");

const format = "dddd D MMMM YYYY, h:mm:ss A [UTC]Z";

/** @name Get Now
 * @example ```js const now = getNow();
 * @returns {string} the current timestamp
 */
const getNow = () => dayjs().format(format);

module.exports = getNow;
