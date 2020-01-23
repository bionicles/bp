/*global Feature */
/*global Scenario */

const url = process.env.TEST_URL;

Feature("landing page");

Scenario("visit the site", async I => {
  I.amOnPage(url);
  I.see("Bion is Cool");
});

Scenario("visit the blog", async I => {
  I.amOnPage(url);
  I.see("Bit Pharma Blog");
});

Scenario("use the API", async I => {
  const result = I.sendPostRequest(`${url}/api/rpc`, { action: "HELLO" });
  assert.equal(result, "WORLD");
});
