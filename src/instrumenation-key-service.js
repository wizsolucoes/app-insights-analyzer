const errorHandler = require('./error-handler');
const errorTag = 'InstrumentationKeyService::ERROR:';

let tableService;
var exports = module.exports;

exports.fetch = async function (tableSvc, tableName, appName) {
  validateArgs(tableSvc, tableName, appName);

  tableService = tableSvc;

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
    const finalError =
      error.code === 'ResourceNotFound'
        ? `Desculpa! A chave de instrumentação para ${appName} não foi encontrada no banco de dados. Por favor contatar o advisor de front-end: Touré Holder <toureholder@wizsolucoes.com.br> para inserí-la.`
        : error;

    handleError(finalError);
  }

  return instrumentationKey;
};

function retrieveEntityAsync(...args) {
  return new Promise((resolve, reject) => {
    tableService.retrieveEntity(...args, (error, result, _) => {
      if (error) {
        return reject(error);
      }

      resolve(result);
    });
  });
}

function validateArgs(tableSvc, tableName, appName) {
  if (!appName) {
    handleError('Application name must be provided.');
  }

  if (!tableSvc) {
    handleError('Table service name must be provided.');
  }

  if (!tableName) {
    handleError('Table name name must be provided.');
  }
}

function handleError(error) {
  errorHandler.handle(errorTag, error);
}
