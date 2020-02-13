module.exports = {
  plugins: [
    "postcss-import",
    "tailwindcss",
    process.env.NODE_ENV === "production"
      ? [
          "@fullhuman/postcss-purgecss",
          {
            content: [
              "./pages/**/*.{js,jsx,ts,tsx}",
              "./components/**/*.{js,jsx,ts,tsx}",
              "./public/index.html"
            ],
            css: ["./css/tailwind.css"],
            // eslint-disable-next-line security/detect-unsafe-regex
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
          }
        ]
      : undefined,
    "autoprefixer",
    "postcss-preset-env",
    "cssnano"
  ]
};

// // medium.com/@xijo/create-react-app-with-tailwind-via-postcss-plus-purgecss-5c36b4c33ba7

// const purgecss = require("@fullhuman/postcss-purgecss")({
//   content: [
//     "./pages/**/*.{js,jsx,ts,tsx}",
//     "./components/**/*.{js,jsx,ts,tsx}",
//     "./public/index.html"
//   ],
//   css: ["./css/tailwind.css"],
//   // Include any special characters you're using in this regular expression
//   defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
// });

// //postcss.config.js
// const tailwindcss = require("tailwindcss");
// module.exports = {
//   plugins: [
//     tailwindcss("./tailwind.config.js"),
//     "autoprefixer",
//     ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
//     "cssnano"
//   ]
// };
