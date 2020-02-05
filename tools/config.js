if (typeof window === "undefined") {
  /**
   * Settings exposed to the server.
   */
  module.exports = {
    SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
    SESSION_COOKIE_LIFETIME: process.env.SESSION_COOKIE_LIFETIME
  };
} else {
  /**
   * Settings exposed to the client.
   */
  module.exports = {};
}
