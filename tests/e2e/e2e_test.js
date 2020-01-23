/*global Feature */
/*global Scenario */
let assert = require("assert");

const url = process.env.TEST_URL;
console.log("e2e test url:", url);

Feature("Landing Page");
Scenario("visit the site", async I => {
  I.amOnPage(url);
  I.see("Bion is Cool");
});

Feature("Blog");
Scenario("visit the blog", async I => {
  I.amOnPage(`${url}/blog`);
  I.see("Bit Pharma Blog");
});

Feature("API");
Scenario("use API HELLO method with no params", async I => {
  const response = await I.sendPostRequest(`/rpc`, {
    id: 1,
    method: "HELLO"
  });
  console.log("response.data", response.data);
  assert.equal(response.data.result, "HELLO WORLD");
});
Scenario("use API HELLO method with params but no name", async I => {
  const response = await I.sendPostRequest(`/rpc`, {
    id: 1,
    method: "HELLO",
    params: { bender: "cool" }
  });
  console.log("response.data", response.data);
  assert.equal(response.data.result, "HELLO WORLD");
});
Scenario("use API HELLO method with params with name", async I => {
  const response = await I.sendPostRequest(`/rpc`, {
    id: 1,
    method: "HELLO",
    params: { name: "BENDER B. RODRIGUEZ" }
  });
  console.log("response.data", response.data);
  assert.equal(response.data.result, "HELLO BENDER B. RODRIGUEZ");
});
