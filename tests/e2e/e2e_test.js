/*global Feature */
/*global Scenario */
import { MailSlurp } from "mailslurp-client";

const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_KEY });
const url = process.env.TEST_URL;
const assert = require("assert");
console.log("e2e test url:", url);

Feature("Search");
Scenario("visit the site", async I => {
  I.amOnPage(url);
  I.see("Search");
});

Feature("Contact");
Scenario("check the contact link", async I => {
  I.amOnPage(url);
  const contactHref = await I.grabAttributeFrom("#contact-link", "href");
  assert.equal(contactHref, "mailto:bion@bitpharma.com");
});

Feature("Blog");
Scenario("visit the blog", async I => {
  I.amOnPage(url);
  I.click("#blog-link");
  I.see("Blog");
});

Feature("Feedback");
Scenario("give feedback", async I => {
  I.amOnPage(url);
  I.see("Feedback");
  I.click("#feedback-link");
  I.see("Leave a comment");
});

Feature("Docs");
Scenario("skim the docs", async I => {
  I.amOnPage(url);
  I.see("Docs");
  I.click("#docs-link");
  I.see("Table of Contents");
  I.see("Quick Start");
  I.see("API");
  I.see("Deep Dive");
  I.see("FAQ");
});

Feature("API");
Scenario("1. /hello", async I => {
  I.amOnPage(url);
  const helloWorldResponse = await I.sendGetRequest("/hello");
  assert.equal(response.status, 200);
  assert.equal(response.data, "Hello World!");
});

Scenario("2. /auth", async I => {
  const { id, emailAddress } = await mailslurp.createInbox();
  const password = "TestP@$$w3rd!";
  // ALLOW SIGN UPS WITH VALID EMAILS
  const signUpResponse = await I.sendPostRequest("/auth/signup", {
    display_name: "testuser",
    email: inbox.emailAddress,
    password
  });
  assert.equal(signUpResponse.statusCode, 200);
  // REJECT EMAILS ALREADY SIGNED UP
  const emailInUseResponse = await I.sendPostRequest("/auth/signup", {
    display_name: "testuser2",
    email: inbox.emailAddress,
    password
  });
  assert.equal(emailInUseResponse.statusCode, 400);
  // REJECT DISPLAY_NAMES ALREADY SIGNED UP
  const nameInUseResponse = await I.sendPostRequest("/auth/signup", {
    display_name: "testuser",
    email: "bob@bob.com",
    password
  });
  assert.equal(nameInUseResponse.statusCode, 400);
  // REJECT NON-EMAIL EMAILS
  const notAnEmailResponse = await I.sendPostRequest("/auth/signup", {
    display_name: "testuser",
    email: "notAnEmail",
    password
  });
  assert.equal(notAnEmailResponse.statusCode, 400);
  // REJECT INCORRECT VERIFICATION CODES
  const incorrectCodeResponse = await I.sendPostRequest("/auth/verify", {
    email: emailAddress,
    code: "probably_incorrect"
  });
  assert.equal(incorrectCodeResponse.status, 400);
  // VERIFY EMAIL WITH CORRECT CODE
  const verifyEmail = await mailslurp.waitForLatestEmail(id);
  assert(/Verify with Bit Pharma using code:/.test(verifyEmail.body));
  const verifyCode = /([0-9]{6})$/.exec(verifyEmail.body)[1];
  const verifyResponse = await I.sendPostRequest("/auth/verify", {
    email: emailAddress,
    code: verifyCode
  });
  assert.equal(verifyResponse.status, 200);
  // REJECT INCORRECT PASSWORDS
  const incorrectPasswordResponse = await I.sendPostRequest("/auth/signin", {
    email: emailAddress,
    password: "WRONG_PASSWORD!!1"
  });
  assert.equal(incorrectPasswordResponse.status, 400);
  // SIGN IN WORKS
  const signInResponse = await I.sendPostRequest("/auth/signin", {
    email: emailAddress,
    password
  });
  assert.equal(signInResponse.status, 200);
  I.seeCookie("session");
  // REJECT INCORRECT PASSWORD IN CHANGE PASSWORD
  const newPassword = "NewP@$$w3rd!";
  const failedChangeResponse = await I.sentPostRequest("/auth/change", {
    password: "WRONG_PASSWORD!!1",
    newPassword
  });
  assert.equal(failedChangeResponse.status, 400);
  // CHANGE PASSWORDS
  const changeResponse = await I.sentPostRequest("/auth/change", {
    password,
    newPassword
  });
  assert.equal(changeResponse.status, 200);
  // SIGN IN WORKS WITH NEW PASSWORD
  const newPasswordSignInResponse = await I.sendPostRequest("/auth/signin", {
    email: emailAddress,
    password: newPassword
  });
  assert.equal(newPasswordSignInResponse.status, 200);
  // FORGOT PASSWORDS
  const forgotResponse = await I.sentPostRequest("/auth/forgot", {
    email
  });
  assert.equal(forgotResponse.status, 200);
  // REJECT INCORRECT RESET CODE
  const incorrectResetCodeResponse = await I.sendPostRequest("/auth/reset", {
    email,
    code: "INCORRECT_FORGOT_CODE"
  });
  assert.equal(incorrectResetCodeResponse.status, 400);
  // RESET PASSWORDS
  const forgotEmail = await mailslurp.waitForLatestEmail(id);
  assert(/Reset your Bit Pharma password using code:/.test(forgotEmail.body));
  const resetCode = /([0-9]{6})$/.exec(forgotEmail.body)[1];
  const resetPassword = "ResetP@$$w3rd!";
  const resetResponse = await I.sendPostRequest("/auth/reset", {
    email,
    code: resetCode,
    newPassword: resetPassword
  });
  assert.equal(resetResponse.status, 200);
  // SIGN IN WORKS WITH RESET PASSWORD
  const resetPasswordSignInResponse = await I.sendPostRequest("/auth/signin", {
    email: emailAddress,
    password: resetPassword
  });
  assert.equal(resetPasswordSignInResponse.status, 200);
  // REJECT ACCOUNT REMOVAL WITH WRONG PASSWORD
  const wrongPasswordRemovalResponse = await I.sendPostRequest("/auth/remove", {
    email: emailAddress,
    password: "BENDER_B_RODRIGUEZ"
  });
  assert.equal(wrongPasswordRemovalResponse.status, 400);
  // REMOVE ACCOUNT WORKS
  const removeResponse = await I.sendPostRequest("/auth/remove", {
    email: emailAddress,
    password: resetPassword
  });
  assert.equal(removeResponse.status, 200);
});

Scenario("3. /teams", async I => {
  // HOW DO I TEST TEAMS?
  // Create - public, private
  // Retrieve - public, private
  // Update - admins, viewers
  // Delete - only superadmins
  // List
});

Scenario("4. /items", async I => {});
Scenario("4. /index", async I => {});
