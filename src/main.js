const azure = require('azure-storage');

const analyzer = require('./analyzer');
const buildBreaker = require('./build-breaker');
const commandLineArgsParser = require('./command-line-args-parser');
const errorHandler = require('./error-handler');
const instrumentationKeyService = require('./instrumenation-key-service');
const publisher = require('./publisher');

const storageAccount = process.env.APPINSIGHTS_ANALYSIS_STORAGE_ACCOUNT;
const storageAccessKey = process.env.APPINSIGHTS_ANALYSIS_STORAGE_KEY;
const tableService = azure.createTableService(storageAccount, storageAccessKey);
const keysTableName = process.env.APPINSIGHTS_ANALYSIS_STORAGE_TABLE;
const resultsTableName = process.env.APPINSIGHTS_ANALYSIS_RESULTS_STORAGE_TABLE;

async function main() {
  validateEnvVars();

  const { app, dir } = commandLineArgsParser.parse();

  const key = await instrumentationKeyService.fetch(
    tableService,
    keysTableName,
    app
  );

  const result = await analyzer.runAnalysis(key, dir);

  await publisher.publishResult(tableService, resultsTableName, app, result);

  await buildBreaker.run(key, result);
}

function validateEnvVars() {
  if (!keysTableName) {
    handleError('Azure Storage keys table name must be provided.');
  }

  if (!resultsTableName) {
    handleError('Azure Storage results table name must be provided.');
  }

  if (!storageAccount) {
    handleError('Azure Storage account must be provided.');
  }

  if (!storageAccessKey) {
    handleError('Azure Storage access key name must be provided.');
  }
}

function handleError(error) {
  errorHandler.handle('ERROR:', error);
}

main();
