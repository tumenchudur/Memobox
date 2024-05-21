const Dotenv = require("dotenv-webpack");

module.exports = {
  // other webpack configuration...
  plugins: [new Dotenv()],
  output: {
    filename: "my-bundle.js", // Adjust the filename as needed
    path: path.resolve(__dirname, "dist"), // Output directory path
  },
};
