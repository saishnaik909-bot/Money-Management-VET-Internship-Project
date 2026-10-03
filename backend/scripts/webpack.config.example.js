// WEEK 6 - Webpack (explanation only, not used by SMM).
// Webpack bundles many JS files into one file for the browser.
// SMM's React app uses Vite, which does the same job (bundling) with
// less configuration. This is what a minimal Webpack config looks like:
//
// npm install --save-dev webpack webpack-cli
// npx webpack --config scripts/webpack.config.example.js
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",                       // start file
  output: { path: path.resolve(__dirname, "dist"), filename: "bundle.js" }, // result
};
