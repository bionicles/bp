// require("dotenv").config();

console.log("CODECEPT CONF JS TEST_URL", process.env.TEST_URL);

// const executablePath = require("child_process").execSync(
//   "which chromium-browser",
//   { encoding: "utf-8" }
// );
// console.log("codecept.conf.js executablePath", executablePath);

exports.config = {
  tests: "./*_test.js",
  output: "./output",
  helpers: {
    Puppeteer: {
      show: true,
      chrome: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
        // executablePath
      }
    },
    REST: {
      endpoint: `${process.env.TEST_URL}/api`,
      onRequest: request => {
        request.headers.auth = "123";
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
