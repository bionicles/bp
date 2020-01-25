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

export const METHODS = "Methods: GET_METHODS, SIGN_UP";

export default (req, res) => {
  console.log(new Date(), req.body);
  const {
    body: { jsonrpc, id, method }
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
  // handle wrong request method
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
      case "GET_METHODS": {
        res.status(200);
        body.result = METHODS;
        break;
      }
      case "SIGN_UP": {
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

// MFA testing stuff for later
// const auth0 = require("auth0-js");
// var auth0Client = new auth0.WebAuth({
//   clientID: process.env.AUTH0_CLIENT_ID,
//   domain: process.env.AUTH0_DOMAIN,
//   redirectUri: process.env.TEST_URL,
//   responseType: "token id_token"
// });
// const twilioClient = require("twilio")(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );
// client.messages
//   .list({
//     dateSent: new Date(Date.UTC(2016, 7, 31, 0, 0, 0)),
//     from: "+15017122661",
//     to: "+15558675310",
//     limit: 20
//   })
//   .then(messages => messages.forEach(m => console.log(m.sid)));
