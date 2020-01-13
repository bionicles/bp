const critical = require("critical");
const path = require("path");

critical.generate({
  /* The path of the Webpack bundle */
  base: path.join(path.resolve(__dirname), "dist/"),
  src: "index.html",
  dest: "index.html",
  inline: true,
  extract: true,
  /* iPhone 6 dimensions, use whatever you like*/
  width: 375,
  height: 565,

  /* Ensure that bundled JS file is called */
  penthouse: {
    blockJSRequests: false
  }
});
