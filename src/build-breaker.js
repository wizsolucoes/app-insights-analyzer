const errorHandler = require('./error-handler');
const errorTag = 'BuildBreaker::ERROR:';

var exports = module.exports;

exports.run = function (instrumentationKey, result) {
  validateArgs(instrumentationKey);

  if (!result) {
    handleError(
      `Expected Application Insights to be configured with instrumentation key: ${instrumentationKey}.\n\nSiga as orientações no nosso knowledge base para fazer a configuração:\n - https://parcorretoradeseguros.sharepoint.com/sites/Gov.Met.Devz/SitePages/Chave-de-instrumenta%C3%A7%C3%A3o-Application-Insights---Onde-encontrar.aspx\n - https://parcorretoradeseguros.sharepoint.com/sites/Gov.Met.Devz/SitePages/Chave-de-instrumenta%C3%A7%C3%A3o-Application-Insights---Onde-encontrar.aspx`
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
