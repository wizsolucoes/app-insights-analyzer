const finder = require('find-in-files');
const errorHandler = require('./error-handler');
const errorTag = 'Analyzer::ERROR:';

var exports = module.exports;

exports.runAnalysis = async function (instrumentationKey, directory) {
  validateArgs(instrumentationKey, directory);

  const keyFound = await findInstrumentationKey(instrumentationKey, directory);
  const dependencyFound = await findAppInsightsSDK();

  if (keyFound === 0) {
    console.log('WARN: Did not find instrumentation key in', directory);
  }

  if (dependencyFound === 0) {
    console.log('WARN: Did not find Application Insights SDK in package.json');
  }

  return keyFound > 0 && dependencyFound > 0;
};

function validateArgs(instrumentationKey, directory) {
  if (!instrumentationKey) {
    handleError('Instrumentation key must be provided.');
  }

  if (!directory) {
    handleError('Directory key must be provided.');
  }
}

async function findInstrumentationKey(instrumentationKey, directory) {
  console.log(
    `INFO: Looking for instrumentation key in directory ${directory} ...`
  );

  const results = await finder.find(
    { term: instrumentationKey, flags: 'ig' },
    directory,
    '.(ts|js|json)$'
  );

  let count = 0;
  for (let result in results) {
    console.log('INFO: Found instrumentation key in', result);
    count++;
  }

  return count;
}

async function findAppInsightsSDK() {
  console.log(`INFO: Looking for Application Insights SDK in package.json`);

  const results = await finder.find(
    {
      term: `(@microsoft/applicationinsights-web|@wizsolucoes/ng-application-insights)`,
      flags: 'ig',
    },
    '.',
    '^package.json'
  );

  let count = 0;
  for (let result in results) {
    console.log(
      `INFO: Found Application Insights SDK in ${result}`,
      results[result].matches
    );
    count++;
  }

  return count;
}

function handleError(error) {
  errorHandler.handle(errorTag, error);
}
