#!/usr/bin/env node
const commandLineArgsParser = require('./src/command-line-args-parser');
const instrumentationKeyService = require('./src/instrumenation-key-service');
const analyzer = require('./src/analyzer');
const buildBreaker = require('./src/build-breaker');

async function main() {
  const { app, dir } = commandLineArgsParser.parse();
  const key = await instrumentationKeyService.fetch(app);
  const result = await analyzer.runAnalysis(key, dir);
  buildBreaker.run(key, result);
}

main();
