export default (req, res) => {
  const {
    body: { id, method, params }
  } = req;
  console.log(req.body);
  let body = { jsonrpc: "2.0", id };

  if (req.method === "POST" && method) {
    switch (method) {
      case "HELLO": {
        const name = !params || !params.name ? "WORLD" : params.name;
        body.result = `HELLO ${name}`;
        break;
      }
      default: {
        console.log(method, "requested but not implemented. payload:", params);
      }
    }
  }
  if (!body.result && !body.error) {
    body.error = {
      code: -32601,
      message: "allowedMethods: POST; allowedActions: HELLO"
    };
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
};
