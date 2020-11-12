var exports = module.exports;

exports.handle = function (tag, error) {
  console.error(tag, error);
  process.exit(1);
};
