export default (req, res) => {
  const {
    query: { id }
  } = req;

  if (req.method === "POST") {
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ name: "John Doe" }));
};
