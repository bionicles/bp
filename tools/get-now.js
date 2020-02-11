const moment = require("moment");

const format = "dddd D MMMM YYYY, h:mm:ss A [UTC]Z";
const getNow = () => moment().format(format);

module.exports = getNow;
