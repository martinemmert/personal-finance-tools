// postcss.config.js
module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss/nesting"),
    require("postcss-atroot"),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
