const path = require("path");

module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    ["@babel/plugin-transform-runtime", { regenerator: true }],
  ],
};
