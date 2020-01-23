export default (req, res) => {
  const {
    body: { action }
  } = req;

  let resultBody = "methods: POST - actions: HELLO";

  if (req.method != "POST" && action) {
    switch (action) {
      case "HELLO": {
        resultBody = "WORLD";
        break;
      }
      default: {
        console.log(action, "not implemented");
      }
    }
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(resultBody));
};
