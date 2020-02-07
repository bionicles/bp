const withMDX = require("@next/mdx")();
const path = require("path");

module.exports = withMDX({
  reactStrictMode: true,
  webpack: config => {
    config.resolve.modules = [__dirname, "node_modules"];
    config.resolve.alias["~"] = path.resolve(__dirname);
    return config;
  }
});
