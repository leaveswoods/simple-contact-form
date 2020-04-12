/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
const plugins = [require("postcss-preset-env"), require("tailwindcss")];

if (process.env.NODE_ENV === "production") {
  plugins.push(
    require("@fullhuman/postcss-purgecss")({
      // Specify the paths to all of the template files in your project
      content: ["./src/**/*.js"],

      // Include any special characters you're using in this regular expression
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    })
  );
  plugins.push(require("cssnano"));
}

plugins.push(require("autoprefixer"));

module.exports = {
  plugins,
};
