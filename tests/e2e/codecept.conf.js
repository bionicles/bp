require("dotenv").config();

console.log("CODECEPT CONF JS TEST_URL", process.env.TEST_URL);
const endpoint = `http://${process.env.TEST_URL}/api`;

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
      show: false,
      chrome: {
        keepCookies: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
        // executablePath
      }
    },
    REST: {
      endpoint,
      onRequest: request => {
        request.headers.auth = "123";
      }
    }
    // autoLogin: {
    //   enabled: true,
    //   saveToFile: true,
    //   inject: "signin",
    //   users: {
    //     super: {
    //       login: async I => {
    //         await I.sendPostRequest(
    //           `/users/${process.env.TEST_SUPER_DISPLAY_NAME}/signin`,
    //           { password: process.env.TEST_SUPER_PASSWORD }
    //         );
    //       },
    //       check: I => {
    //         I.amOnPage("/");
    //         I.see(process.env.TEST_SUPER_DISPLAY_NAME);
    //         I.seeCookie("session");
    //       }
    //     },
    //     admin: {
    //       login: async I => {
    //         await I.sendPostRequest(
    //           `/users/${process.env.TEST_ADMIN_DISPLAY_NAME}/signin`,
    //           { password: process.env.TEST_ADMIN_PASSWORD }
    //         );
    //       },
    //       check: I => {
    //         I.amOnPage("/");
    //         I.see(process.env.TEST_ADMIN_DISPLAY_NAME);
    //         I.seeCookie("session");
    //       }
    //     },
    //     viewer: {
    //       login: async I => {
    //         await I.sendPostRequest(
    //           `/users/${process.env.TEST_VIEWER_DISPLAY_NAME}/signin`,
    //           { password: process.env.TEST_VIEWER_PASSWORD }
    //         );
    //       },
    //       check: I => {
    //         I.amOnPage("/");
    //         I.see(process.env.TEST_SUPER_DISPLAY_NAME);
    //         I.seeCookie("session");
    //       }
    //     }
    //   }
    // }
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
  },
  require: []
};
