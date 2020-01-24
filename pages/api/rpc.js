// const PARSE_ERROR = -32700;
const INVALID_REQUEST = {
  error: -32600,
  status: 500
};
const METHOD_NOT_FOUND = {
  error: -32601,
  status: 404
};
// const INVALID_PARAMS = -32602;
// const SERVER_ERROR = -32000;
// const SERVER_ERROR_MAX = -32099;

export const METHODS = "Methods: PING, GET_METHODS, HELLO";

export default (req, res) => {
  console.log(new Date(), req.body);
  const {
    body: { jsonrpc, id, method, params }
  } = req;
  res.setHeader("Content-Type", "application/json");
  let body = { jsonrpc: "2.0" };

  // handle wrong jsonrpc version
  if (!jsonrpc || jsonrpc != "2.0") {
    res.status(INVALID_REQUEST.status);
    body.error = {
      code: INVALID_REQUEST.error,
      message: "Invalid request does not specify jsonrpc: 2.0"
    };
    res.end(JSON.stringify(body));
    return;
  }

  if (req.method !== "POST") {
    res.status(INVALID_REQUEST.status);
    body.error = {
      code: INVALID_REQUEST.error,
      message: "Invalid method. Only POST is supported."
    };
    res.end();
    return;
  }

  if (req.method === "POST") {
    switch (method) {
      case "PING": {
        res.status(200);
        body.result = "PONG";
        break;
      }
      case "HELLO": {
        res.status(200);
        const name = !params || !params.name ? "WORLD" : params.name;
        body.result = `HELLO ${name}`;
        break;
      }
      case "GET_METHODS": {
        res.status(200);
        body.result = METHODS;
        break;
      }
      default: {
        res.status(METHOD_NOT_FOUND.status);
        body.error = {
          code: METHOD_NOT_FOUND.error,
          message: METHODS
        };
        res.end(JSON.stringify(body));
      }
    }
  }

  console.log("RES.STATUSCODE", res.statusCode);
  if (!id) {
    res.status(204).end();
    return;
  } else {
    body.id = id;
    res.end(JSON.stringify(body));
    return;
  }
};
