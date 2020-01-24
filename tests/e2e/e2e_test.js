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
  assert.equal(response.data.id, 1);
  assert.equal(response.status, 200);
});
Scenario("use API HELLO method with params but no name", async I => {
  const response = await I.sendPostRequest(`/rpc`, {
    jsonrpc: "2.0",
    id: 2,
    method: "HELLO",
    params: { bender: "cool" }
  });
  assert.equal(response.data.result, "HELLO WORLD");
  assert.equal(response.data.id, 2);
  assert.equal(response.status, 200);
});
Scenario("use API HELLO method with params with name", async I => {
  const response = await I.sendPostRequest(`/rpc`, {
    jsonrpc: "2.0",
    id: 3,
    method: "HELLO",
    params: { name: "BENDER B. RODRIGUEZ" }
  });
  assert.equal(response.data.result, "HELLO BENDER B. RODRIGUEZ");
  assert.equal(response.status, 200);
  assert.equal(response.data.id, 3);
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
    method: "PING"
  });
  assert.equal(status, 204);
  assert(!data.result);
});
Scenario(
  "get status code 500, error code -32600 and no result when I don't specify jsonrpc 2.0",
  async I => {
    const { status, data } = await I.sendPostRequest(`/rpc`, {
      method: "PING"
    });
    assert.equal(data.error.code, -32600);
    assert.equal(status, 500);
    assert(!data.result);
  }
);
Scenario("get PONG and status 200 when I PING", async I => {
  const { status, data } = await I.sendPostRequest(`/rpc`, {
    id: 5,
    jsonrpc: "2.0",
    method: "PING"
  });
  assert.equal(data.result, "PONG");
  assert.equal(status, 200);
});
