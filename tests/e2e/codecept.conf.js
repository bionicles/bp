require("dotenv").config();

console.log("CODECEPT CONF JS TEST_URL", process.env.TEST_URL);

exports.config = {
  tests: "./*_test.js",
  output: "./output",
  helpers: {
    Puppeteer: {
      show: true,
      chrome: {
        args: ["--no-sandbox"]
      }
    }
  },
  include: {
    I: "./steps_file.js"
  },
  bootstrap: null,
  mocha: {},
  name: "tests",
  plugins: {
    retryFailedStep: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }
};
