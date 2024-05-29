const Dotenv = require("dotenv-webpack");

module.exports = {
  // Your entry point
  entry: "./src/index.js",
  // Output configuration
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },
  plugins: [new Dotenv()],
};
