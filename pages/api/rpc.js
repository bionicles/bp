// const PARSE_ERROR = -32700;
const INVALID_REQUEST = -32600;
const METHOD_NOT_FOUND = -32601;
// const INVALID_PARAMS = -32602;
// const SERVER_ERROR = -32000;
// const SERVER_ERROR_MAX = -32099;

export const METHODS = "Methods: PING, GET_METHODS, HELLO";

export default (req, res) => {
  console.log(new Date(), req.body);
  const {
    body: { jsonrpc, id, method, params }
  } = req;

  let body = { jsonrpc: "2.0" };
  if (id) {
    body.id = id;
  }

  if (!jsonrpc || jsonrpc != "2.0") {
    body.error = {
      code: INVALID_REQUEST,
      message: "Invalid value for req.body.jsonrpc. Only '2.0' is supported."
    };
  }

  if (id && req.method === "POST") {
    switch (method) {
      case "PING": {
        body.result = "PONG";
        break;
      }
      case "HELLO": {
        const name = !params || !params.name ? "WORLD" : params.name;
        body.result = `HELLO ${name}`;
        break;
      }
      case "GET_METHODS": {
        body.result = METHODS;
        break;
      }
      default: {
        body.error = {
          code: METHOD_NOT_FOUND,
          message: METHODS
        };
      }
    }
  } else if (id && req.method !== "POST") {
    body.error = {
      code: INVALID_REQUEST,
      message: "Invalid method. Only POST is supported."
    };
  }
  if (!body.result && !body.error) {
    body.error = {
      code: METHOD_NOT_FOUND,
      message: "Methods: PING, GET_METHODS, HELLO"
    };
  }
  if (!id) {
    res.status(204).end();
    return;
  }
  res.setHeader("Content-Type", "application/json");
  res.status(200).end(JSON.stringify(body));
  return;
};
