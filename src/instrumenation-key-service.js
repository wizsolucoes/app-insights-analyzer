const azure = require('azure-storage');
const errorHandler = require('./error-handler');
const errorTag = 'InstrumentationKeyService::ERROR:';

const tableName = process.env.APPINSIGHTS_ANALYSIS_STORAGE_TABLE;
const storageAccount = process.env.APPINSIGHTS_ANALYSIS_STORAGE_ACCOUNT;
const storageAccessKey = process.env.APPINSIGHTS_ANALYSIS_STORAGE_KEY;
validateEnvVars();

const tableSvc = azure.createTableService(storageAccount, storageAccessKey);
var exports = module.exports;

exports.fetch = async function (appName) {
  validateArgs(appName);

  let instrumentationKey;

  try {
    console.log('INFO:', 'Fetching instrumentation key...');
    const retrievedEntity = await retrieveEntityAsync(
      tableName,
      appName,
      'Application'
    );

    instrumentationKey = retrievedEntity.InstrumentationKey._;
    console.log(
      'INFO:',
      `Instrumentation key for application ${appName}: ${instrumentationKey}`
    );
  } catch (error) {
    handleError(error);
  }

  return instrumentationKey;
};

function retrieveEntityAsync(...args) {
  return new Promise((resolve, reject) => {
    tableSvc.retrieveEntity(...args, (error, result, _) => {
      if (error) {
        return reject(error);
      }

      resolve(result);
    });
  });
}

function validateArgs(appName) {
  if (!appName) {
    handleError('Application name must be provided.');
  }
}

function validateEnvVars() {
  if (!tableName) {
    handleError('Azure Storage table name must be provided.');
  }

  if (!storageAccount) {
    handleError('Azure Storage account must be provided.');
  }

  if (!storageAccessKey) {
    handleError('Azure Storage access key name must be provided.');
  }
}

function handleError(error) {
  errorHandler.handle(errorTag, error);
}
