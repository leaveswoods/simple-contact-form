const { src, dest } = require("gulp");

exports.default = () => {
  return src("dist/*").pipe(dest("demo/build"));
};
