#!/usr/bin/env node
const commandLineArgsParser = require('./src/command-line-args-parser');
const instrumentationKeyService = require('./src/instrumenation-key-service');
const analyzer = require('./src/analyzer');
const updater = require('./src/updater');
const buildBreaker = require('./src/build-breaker');

async function main() {
  updater.update();
}

main();
