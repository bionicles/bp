/*global Feature */
/*global Scenario */
require("dotenv").config();
const { MailSlurp } = require("../../node_modules/mailslurp-client");
const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_KEY });
const chai = require("chai");
chai.use(require("chai-json-schema-ajv"));
const expect = chai.expect;

const API_LOG = 1;
const MAX_LAG = 1000;
const url = process.env.TEST_URL;
console.log("e2e_test.js url: ", url);

const timeSince = start => process.hrtime(start)[1] / 1000000;

Feature("API");
// Scenario("0. /hello", async I => {
//   const helloStart = process.hrtime();
//   const helloResponse = await I.sendGetRequest("/hello");
//   expect(timeSince(helloStart)).to.be.lessThan(MAX_LAG);
//   expect(helloResponse.status).to.equal(200);
//   expect(helloResponse.data).to.equal("Hello World!");
// });

Scenario("1. /admin/migrate", async I => {
  // const migrateStart = process.hrtime();
  const migrationResponse = await I.sendPostRequest("/admin/migrate", {
    password: process.env.ADMIN_PASSWORD
  });
  console.log(
    "migrationResponse",
    migrationResponse.status,
    migrationResponse.data
  );
  // expect(timeSince(migrateStart)).to.be.lessThan(MAX_LAG);
  expect(migrationResponse.status).to.equal(200);
});

// Scenario("2. /admin/pingdb", async I => {
//   // const pingDbStart = process.hrtime();
//   const pingDbResponse = await I.sendPostRequest("/admin/pingdb");
//   console.log(">>>>> RES", pingDbResponse.status, pingDbResponse.data);
//   // expect(timeSince(pingDbStart)).to.be.lessThan(MAX_LAG);
//   expect(pingDbResponse.status).to.equal(200);
// });

// Scenario("2. /users", async I => {
//   // ALLOW SIGN UP WITH VALID EMAILS
//   const inbox = await mailslurp.createInbox();
//   const password = "TestP@$$w3rd!";
//   const display_name = "testuser";
//   const signUpStart = process.hrtime();
//   const signUpResponse = await I.sendPostRequest("/users", {
//     email: inbox.emailAddress,
//     display_name,
//     password
//   });
//   if (API_LOG) console.log(signUpResponse);
//   expect(timeSince(signUpStart)).to.be.lessThan(MAX_LAG);
//   expect(signUpResponse.status).to.equal(200);

//   // GET EMAIL WITH CODE
//   const verifyEmail = await mailslurp.waitForLatestEmail(id);
//   expect(timeSince(signUpStart)).to.be.lessThan(5000); // Emails within 5 seconds
//   expect(verifyEmail.body).to.match(/Verify with Bit Pharma using code:/);
//   const verifyCode = /([0-9]{6})$/.exec(verifyEmail.body)[1];
//   expect(verifyCode).to.exist.and.to.have.lengthOf(6);

//   // REJECT INCORRECT VERIFICATION CODES
//   const incorrectCodeStart = process.hrtime();
//   const incorrectCodeResponse = await I.sendPostRequest(
//     `/users/${display_name}/verify`,
//     {
//       code: "probably_incorrect"
//     }
//   );
//   expect(timeSince(incorrectCodeStart)).to.be.lessThan(MAX_LAG);
//   expect(incorrectCodeResponse.status).to.equal(400);

//   // VERIFY EMAIL WITH CORRECT CODE
//   const verifyStart = process.hrtime();
//   const verifyResponse = await I.sendPostRequest(
//     `/users/${display_name}/verify`,
//     {
//       code: verifyCode
//     }
//   );
//   expect(timeSince(verifyStart)).to.be.lessThan(MAX_LAG);
//   expect(verifyResponse.status).to.equal(200);
//   mailslurp.deleteEmail(verifyEmail.id);

//   // REJECT EMAILS ALREADY SIGNED UP
//   const emailInUseStart = process.hrtime();
//   const emailInUseResponse = await I.sendPostRequest("/users", {
//     display_name: "testuser2",
//     email: inbox.emailAddress,
//     password
//   });
//   expect(timeSince(emailInUseStart)).to.be.lessThan(MAX_LAG);
//   expect(emailInUseResponse.statusCode).to.equal(400);

//   // REJECT DISPLAY_NAMES ALREADY SIGNED UP
//   const nameInUseStart = process.hrtime();
//   const nameInUseResponse = await I.sendPostRequest("/users", {
//     email: "bob@bob.com",
//     display_name,
//     password
//   });
//   expect(timeSince(nameInUseStart)).to.be.lessThan(MAX_LAG);
//   expect(nameInUseResponse.statusCode).to.equal(400);

//   // REJECT NON-EMAIL EMAILS
//   const notAnEmailStart = process.hrtime();
//   const notAnEmailResponse = await I.sendPostRequest("/users", {
//     display_name: "testuser3",
//     email: "notAnEmail",
//     password
//   });
//   expect(timeSince(notAnEmailStart)).to.be.lessThan(MAX_LAG);
//   expect(notAnEmailResponse.statusCode).to.equal(400);

//   // REJECT BAD PASSWORDS
//   const badPwStart = process.hrtime();
//   const badPwResponse = await I.sendPostRequest("/users", {
//     display_name: "testuser3",
//     email: "bob@bob.com",
//     password: ""
//   });
//   expect(timeSince(badPwStart)).to.be.lessThan(MAX_LAG);
//   expect(badPwResponse.statusCode).to.equal(400);

//   // REJECT SIGN IN WITH WRONG PASSWORD
//   const incorrectPasswordStart = process.hrtime();
//   const incorrectPasswordResponse = await I.sendPostRequest(
//     `/users/${display_name}/signin`,
//     {
//       email: emailAddress,
//       password: "WRONG_PASSWORD!!1"
//     }
//   );
//   expect(timeSince(incorrectPasswordStart)).to.be.lessThan(MAX_LAG);
//   expect(incorrectPasswordResponse.status).to.equal(400);

//   // SIGN IN WORKS
//   const signInStart = process.hrtine();
//   const signInResponse = await I.sendPostRequest(
//     `/users/${display_name}/signin`,
//     {
//       email: emailAddress,
//       password
//     }
//   );
//   expect(timeSince(signInStart)).to.be.lessThan(MAX_LAG);
//   expect(signInResponse.status).to.equal(200);
//   I.seeCookie("session");

//   // REJECT INCORRECT PASSWORD IN CHANGE PASSWORD
//   const newPassword = "NewP@$$w3rd!";
//   const failedChangeStart = process.hrtime();
//   const failedChangeResponse = await I.sendPostRequest(
//     `/users/${display_name}/password`,
//     {
//       password: "WRONG_PASSWORD!!1",
//       newPassword
//     }
//   );
//   expect(timeSince(failedChangeStart)).to.be.lessThan(MAX_LAG);
//   expect(failedChangeResponse.status).to.equal(400);

//   // CHANGE PASSWORDS
//   const changePasswordStart = process.hrtime();
//   const changeResponse = await I.sendPostRequest(
//     `/users/${display_name}/password`,
//     {
//       password,
//       newPassword
//     }
//   );
//   expect(timeSince(changePasswordStart)).to.be.lessThan(MAX_LAG);
//   expect(changeResponse.status).to.equal(200);

//   // SIGN IN WORKS WITH NEW PASSWORD
//   const newPasswordSignInStart = process.hrtime();
//   const newPasswordSignInResponse = await I.sendPostRequest(
//     `/users/${display_name}/signin`,
//     {
//       email: emailAddress,
//       password: newPassword
//     }
//   );
//   expect(timeSince(newPasswordSignInStart)).to.be.lessThan(MAX_LAG);
//   expect(newPasswordSignInResponse.status).to.equal(200);

//   // FORGOT PASSWORDS
//   const forgotStart = process.hrtime();
//   const forgotResponse = await I.sendPostRequest(
//     `/users/${display_name}/forgot`
//   );
//   expect(timeSince(forgotStart)).to.be.lessThan(MAX_LAG);
//   expect(forgotResponse.status).to.equal(200);
//   const forgotEmail = await mailslurp.waitForLatestEmail(id);
//   expect(timeSince(forgotStart)).to.be.lessThan(5000); // Emails within 5 seconds
//   expect(forgotEmail.body).to.match(
//     /Reset your Bit Pharma password with code:/
//   );
//   const resetCode = /([0-9]{6})$/.exec(forgotEmail.body)[1];
//   const resetPassword = "ResetP@$$w3rd!";
//   const resetStart = process.hrtime();
//   const resetResponse = await I.sendPostRequest(
//     `/users/${display_name}/reset`,
//     {
//       code: resetCode,
//       newPassword: resetPassword
//     }
//   );
//   expect(timeSince(resetStart)).to.be.lessThan(MAX_LAG);
//   expect(resetResponse.status).to.equal(200);
//   mailslurp.deleteEmail(forgotEmail.id);

//   // REJECT USED RESET CODES
//   const resetAgainStart = process.hrtime();
//   const resetAgainResponse = await I.sendPostRequest(
//     `/users/${display_name}/reset`,
//     {
//       code: resetCode,
//       newPassword: "ANOTHER P@$SWORD!"
//     }
//   );
//   expect(timeSince(resetAgainStart)).to.be.lessThan(MAX_LAG);
//   expect(resetAgainResponse.status).to.equal(400);

//   // REJECT INCORRECT RESET CODE
//   const incorrectResetCodeStart = process.hrtime();
//   const incorrectResetCodeResponse = await I.sendPostRequest(
//     `/users/${display_name}/reset`,
//     {
//       code: "good news, everyone!",
//       newPassword: ""
//     }
//   );
//   expect(timeSince(incorrectResetCodeStart)).to.be.lessThan(MAX_LAG);
//   expect(incorrectResetCodeResponse.status).to.equal(400);

//   // SIGN IN WORKS WITH RESET PASSWORD
//   const resetPasswordSignInStart = process.hrtime();
//   const resetPasswordSignInResponse = await I.sendPostRequest(
//     `/users/${display_name}/signin`,
//     {
//       email: emailAddress,
//       password: resetPassword
//     }
//   );
//   expect(timeSince(resetPasswordSignInStart)).to.be.lessThan(MAX_LAG);
//   expect(resetPasswordSignInResponse.status).to.equal(200);

//   // REJECT ACCOUNT REMOVAL WITH WRONG PASSWORD
//   const badPwDeleteStart = process.hrtime();
//   const badPwDeleteResponse = await I.sendDeleteRequest(
//     `/users/${display_name}`,
//     {
//       email: emailAddress,
//       password: "BENDER_B_RODRIGUEZ"
//     }
//   );
//   expect(timeSince(badPwDeleteStart)).to.be.lessThan(MAX_LAG);
//   expect(badPwDeleteResponse.status).to.equal(400);

//   // DELETE ACCOUNT WORKS
//   const deleteStart = process.hrtime();
//   const deleteResponse = await I.sendDeleteRequest(`/users/${display_name}`, {
//     email: emailAddress,
//     password: resetPassword
//   });
//   expect(timeSince(deleteStart)).to.be.lessThan(MAX_LAG);
//   expect(deleteResponse.status).to.equal(200);

//   // CLEAN UP
//   mailslurp.deleteInbox(inbox.id);
// });

// Scenario("3. /teams", async I => {
// HOW DO I TEST TEAMS?
// Create - public, private
// Retrieve - public, private
// Update - admins, viewers
// Delete - only superadmins
// List
// });

// Scenario("4. /items", async I => {});
// Scenario("5. /index", async I => {});
// Scenario("6. /orders", async I => {});
// Scenario("6. /events", async I => {});

// Feature("Search");
// Scenario("visit the site", async I => {
//   I.amOnPage(url);
//   I.see("Search");
// });

// Feature("Contact");
// Scenario("check the contact link", async I => {
//   I.amOnPage(url);
//   const contactHref = await I.grabAttributeFrom("#contact-link", "href");
//   expect(contactHref).to.equal("mailto:bion@bitpharma.com");
// });

// Feature("Blog");
// Scenario("visit the blog", async I => {
//   I.amOnPage(url);
//   I.click("#blog-link");
//   I.see("Blog");
// });

// Feature("Feedback");
// Scenario("give feedback", async I => {
//   I.amOnPage(url);
//   I.see("Feedback");
//   I.click("#feedback-link");
//   I.see("Leave a comment");
// });

// Feature("Docs");
// Scenario("skim the docs", async I => {
//   I.amOnPage(url);
//   I.see("Docs");
//   I.click("#docs-link");
//   I.see("Table of Contents");
//   I.see("Quick Start");
//   I.see("API");
//   I.see("Deep Dive");
//   I.see("FAQ");
// });
