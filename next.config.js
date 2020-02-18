require("dotenv").config();
// const withCustomBabelConfigFile = require("next-plugin-custom-babel-config");
// const withTranspileModules = require("next-plugin-transpile-modules");
const withMDX = require("@next/mdx")();
// const path = require("path");

module.exports = withMDX();
// withCustomBabelConfigFile({
//   babelConfigFile: path.join(__dirname, "babel.config.js"),
//   webpack: config => {
//     config.resolve.alias["components"] = path.join(__dirname, "components");
//     config.resolve.alias["tools"] = path.join(__dirname, "tools");
//     config.node = { dns: "mock", net: "mock", fs: "mock" };
//     return config;
//   }
// })
//   withTranspileModules(
//     withCustomBabelConfigFile({
//       babelConfigFile: path.resolve("./.babelrc.js"),
//       transpileModules: ["pg"],
//       webpack: config => {
//         config.module.rules = [
//           {
//             test: /\.m?js$/,
//             exclude: /(node_modules|bower_components)/,
//             use: {
//               loader: "babel-loader",
//               options: {
//                 presets: ["@babel/preset-env"]
//               }
//             }
//           }
//         ];
//         // config.resolve.modules = [path.join(__dirname, "node_modules")];
//         config.resolve.alias["components"] = path.join(__dirname, "components");
//         config.resolve.alias["tools"] = path.join(__dirname, "tools");
//         // config.optimization.removeAvailableModules = false;
//         // config.optimization.removeEmptyChunks = false;
//         // config.output.pathinfo = false;
//         // config.node = { net: "empty" };
//         return config;
//       }
//     })
//   )
// );

// {
// webpack(config, options) {
//   config.resolve.alias["components"] = path.join(__dirname, "components");
//   config.resolve.alias["tools"] = path.join(__dirname, "tools");
//   config.resolve.alias["pg"] = path.join(
//     __dirname,
//     "node_modules/node-postgres"
//   );
//   config.node = { net: "empty" };
//   return config;
// }
// }
