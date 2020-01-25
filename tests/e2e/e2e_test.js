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

Feature("GET_METHODS method");
Scenario("get status 200 and methods list when I use GET_METHODS", async I => {
  const response = await I.sendPostRequest(`/rpc`, {
    jsonrpc: "2.0",
    id: 1,
    method: "GET_METHODS"
  });
  assert.equal(response.data.result.slice(0, 7), "Methods");
  assert.equal(response.status, 200);
  assert.equal(response.data.id, 1);
});
Scenario(
  "get status code 404, error code -32601, and methods when I use nonexistent methods",
  async I => {
    const response = await I.sendPostRequest(`/rpc`, {
      jsonrpc: "2.0",
      id: 4,
      method: "NONEXISTENT",
      params: { name: "PROFESSOR HUBERT J. FARNSWORTH" }
    });
    assert.equal(response.data.error.message.slice(0, 7), "Methods");
    assert.equal(response.data.error.code, -32601);
    assert.equal(response.status, 404);
  }
);
Scenario("get status 204 and no result when I notify with no id", async I => {
  const { status, data } = await I.sendPostRequest(`/rpc`, {
    jsonrpc: "2.0",
    method: "GET_METHODS"
  });
  assert.equal(status, 204);
  assert(!data.result);
});
Scenario(
  "get status code 500, error code -32600, error message, and no result when I don't specify jsonrpc 2.0",
  async I => {
    const { status, data } = await I.sendPostRequest(`/rpc`, {
      method: "GET_METHODS"
    });
    assert.equal(data.error.code, -32600);
    assert(data.error.message);
    assert.equal(status, 500);
    assert(!data.result);
  }
);

// Feature("SIGN_UP method");
// Scenario("I SIGN_UP with a phone number", async I => {
//   const { status, data } = await I.sendPostRequest(`/rpc`, {
//     id: 5,
//     jsonrpc: "2.0",
//     method: "SIGN_UP",
//     params: {
//       number: process.env.PHONE_NUMBER
//     }
//   });
//   assert.equal(status, 200);
// });
