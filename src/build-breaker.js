const errorHandler = require('./error-handler');
const errorTag = 'BuildBreaker::ERROR:';

var exports = module.exports;

exports.run = function (instrumentationKey, result) {
  validateArgs(instrumentationKey);

  if (!result) {
    handleError(
      `Expected Application Insights to be configured with instrumentation key: ${instrumentationKey}.`
    );
  } else {
    console.log('INFO:', 'Application Insights is configured as expected.');
  }
};

function validateArgs(instrumentationKey) {
  if (!instrumentationKey) {
    handleError('Instrumentation key must be provided.');
  }
}

function handleError(error) {
  errorHandler.handle(errorTag, error);
}
