const withMDX = require("@next/mdx")();
const compose = require("next-compose");

module.exports = compose([
  [
    withMDX,
    {
      reactStrictMode: true
    }
  ]
]);
