const fs = require("fs");

export const pgConfig = {
  ssl: {
    rejectUnauthorized: false,
    ca: [fs.readFileSync("./rds-combined-ca-bundle.pem"), "ascii"]
  }
};
