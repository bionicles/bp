// medium.com/@xijo/create-react-app-with-tailwind-via-postcss-plus-purgecss-5c36b4c33ba7

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.jsx", "./src/**/*.js", "./public/index.html"],
  css: ["./src/css/tailwind.css"],
  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

//postcss.config.js
const tailwindcss = require("tailwindcss");
module.exports = {
  plugins: [
    tailwindcss("./tailwind.config.js"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
  ]
};
