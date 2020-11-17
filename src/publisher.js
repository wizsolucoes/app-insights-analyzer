const azure = require('azure-storage');

const errorHandler = require('./error-handler');
const errorTag = 'Publisher::ERROR:';

const entGen = azure.TableUtilities.entityGenerator;

let tableService;
var exports = module.exports;

exports.publishResult = async function (tableSvc, tableName, appName, result) {
  validateArgs(tableSvc, tableName, appName, result);

  tableService = tableSvc;

  console.log('INFO:', 'Pubslishing results...');

  try {
    await createTableIfNotExistsAsync(tableName);
  } catch (error) {
    handleError(error);
  }

  const entity = {
    PartitionKey: entGen.String(appName),
    RowKey: entGen.String('Application'),
    lastAnalysisResult: entGen.String(result),
    date: entGen.String(`${new Date().getTime()}`),
  };

  try {
    await insertOrMergeEntityAsync(tableName, entity);
    console.log('INFO:', 'Results published.');
  } catch (error) {
    handleError(error);
  }
};

function insertOrMergeEntityAsync(...args) {
  return new Promise((resolve, reject) => {
    tableService.insertOrMergeEntity(...args, (error, result, _) => {
      if (error) {
        return reject(error);
      }

      resolve(result);
    });
  });
}

function createTableIfNotExistsAsync(...args) {
  return new Promise((resolve, reject) => {
    tableService.createTableIfNotExists(...args, (error, result, _) => {
      if (error) {
        return reject(error);
      }

      resolve(result);
    });
  });
}

function validateArgs(tableSvc, tableName, appName, result) {
  if (!appName) {
    handleError('Application name must be provided.');
  }

  if (!tableSvc) {
    handleError('Table service name must be provided.');
  }

  if (!tableName) {
    handleError('Table name name must be provided.');
  }

  if (result === null || result === undefined) {
    handleError('Result must be provided.');
  }
}

function handleError(error) {
  errorHandler.handle(errorTag, error);
}
