/*global Feature */
/*global Scenario */
let assert = require("assert");
let http = require("http");

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
    jsonrpc: "2.0",
    id: 1,
    method: "HELLO"
  });
  assert.equal(response.data.result, "HELLO WORLD");
});
Scenario("use API HELLO method with params but no name", async I => {
  const response = await I.sendPostRequest(`/rpc`, {
    jsonrpc: "2.0",
    id: 2,
    method: "HELLO",
    params: { bender: "cool" }
  });
  assert.equal(response.data.result, "HELLO WORLD");
});
Scenario("use API HELLO method with params with name", async I => {
  const response = await I.sendPostRequest(`/rpc`, {
    jsonrpc: "2.0",
    id: 3,
    method: "HELLO",
    params: { name: "BENDER B. RODRIGUEZ" }
  });
  assert.equal(response.data.result, "HELLO BENDER B. RODRIGUEZ");
});
Scenario("use API NONEXISTENT method", async I => {
  const response = await I.sendPostRequest(`/rpc`, {
    jsonrpc: "2.0",
    id: 4,
    method: "NONEXISTENT",
    params: { name: "PROFESSOR HUBERT J. FARNSWORTH" }
  });
  assert.equal(response.data.error.code, -32601);
});
Scenario("get status 204 and no result when I notify with no id", async I => {
  const { status, data } = await I.sendPostRequest(`/rpc`, {
    jsonrpc: "2.0",
    method: "PING"
  });
  assert(status === 204 && !data.result);
});
Scenario("get PONG when I PING", async I => {
  const response = await I.sendPostRequest(`/rpc`, {
    id: 5,
    jsonrpc: "2.0",
    method: "PING"
  });
  assert.equal(response.data.result, "PONG");
});
