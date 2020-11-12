const commandLineArgs = require('command-line-args');

var exports = module.exports;

exports.parse = function () {
  const optionDefinitions = [
    { name: 'app', alias: 'a', type: String },
    { name: 'dir', alias: 'd', type: String },
  ];

  const options = commandLineArgs(optionDefinitions);

  const app = options.app;
  const dir = options.dir || '.';

  return { app, dir };
};
