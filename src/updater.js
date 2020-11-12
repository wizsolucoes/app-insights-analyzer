const azure = require('azure-storage');
const errorHandler = require('./error-handler');
const errorTag = 'Updater::ERROR:';

const entGen = azure.TableUtilities.entityGenerator;

const tableName = process.env.APPINSIGHTS_ANALYSIS_STORAGE_TABLE;
const storageAccount = process.env.APPINSIGHTS_ANALYSIS_STORAGE_ACCOUNT;
const storageAccessKey = process.env.APPINSIGHTS_ANALYSIS_STORAGE_KEY;
validateEnvVars();

const tableSvc = azure.createTableService(storageAccount, storageAccessKey);
var exports = module.exports;

exports.update = async function () {
  const array = [
    { app: 'wizonWeb', key: 'efa33ff7-355c-4c7c-874d-eef5a1f0a8ed' },
    { app: 'wizonGestorWeb', key: 'efa33ff7-355c-4c7c-874d-eef5a1f0a8ed' },
    { app: 'wizonAdminWeb', key: 'efa33ff7-355c-4c7c-874d-eef5a1f0a8ed' },
    { app: 'wizis-web', key: 'missing-key' },
    { app: 'facilWeb', key: 'missing-key' },
    { app: 'hubWeb', key: '251720ad-2d89-4c7f-9e76-d8e65cadddf2' },
    { app: 'wizmais-web', key: 'missing-key' },
    { app: 'gupWeb', key: 'missing-key' },
    { app: 'vendasWeb', key: 'd11b6e4c-2420-49b1-bd4c-33acf99d96fb' },
    { app: 'speed-web', key: 'ac26ac95-a490-4984-b45f-263550ddf17e' },
    {
      app: 'backoffice-engagement-web',
      key: 'ad6d9e18-3097-4103-8c4a-75884f3a1d03',
    },
    { app: 'weplataforma-web', key: 'ad6d9e18-3097-4103-8c4a-75884f3a1d03' },
    { app: 'sinistroWeb', key: '9715fe4d-1c67-482c-8c00-77185ff49cad' },
    { app: 'painelregulacaoWeb', key: 'missing-key' },
    { app: 'sinistrosappWeb', key: '9715fe4d-1c67-482c-8c00-77185ff49cad' },
    { app: 'sinistrosrcpm-web', key: '9715fe4d-1c67-482c-8c00-77185ff49cad' },
    { app: 'seguronewe-web', key: '46b24dfe-1177-4de2-a0f3-4ef1b6572db0' },
    { app: 'sinistrosnewe-web', key: '46b24dfe-1177-4de2-a0f3-4ef1b6572db0' },
    { app: 'wizseg-web', key: 'missing-key' },
    { app: 'cotagro-web', key: '99e40dcc-022d-4a5a-86e7-cd5fdfcca46f  ' },
    { app: 'sx1-web', key: 'missing-key' },
    { app: 'wizconseg-web', key: 'missing-key' },
    { app: 'conexaoconseg-web', key: 'missing-key' },
    { app: 'conexaoconseghome-web', key: 'missing-key' },
    { app: 'wizteligaWeb', key: 'ac338e81-f749-4609-87e8-e12184bc28ec' },
    { app: 'wizcomvcWeb', key: 'missing-key' },
    { app: 'wizqualifyWeb', key: 'missing-key' },
    { app: 'wizcomvcseguroautoWeb', key: 'missing-key' },
    { app: 'blipmktcloud-web', key: 'missing-key' },
    { app: 'wini-web', key: 'c909b5d5-5b48-4bcb-a62d-c5b126725dea' },
    { app: 'wizcomvoceb2udigital-web', key: 'missing-key' },
    { app: 'captalead-web', key: 'missing-key' },
    { app: 'wimob2u-web', key: 'missing-key' },
    { app: 'bbx-web', key: 'missing-key' },
    { app: 'wizbeneficios-web', key: '580d648b-0331-490e-899c-b9e9b5ac4f8c' },
    {
      app: 'portal-desenvolvedor-web',
      key: 'a0cc9c31-846d-4a3d-81d8-863fba4e21fb',
    },
    { app: 'tonawiz-web', key: 'missing-key' },
    { app: 'wizonWeb', key: 'efa33ff7-355c-4c7c-874d-eef5a1f0a8ed' },
    { app: 'wizonGestorWeb', key: 'efa33ff7-355c-4c7c-874d-eef5a1f0a8ed' },
    { app: 'experienciaAzulWeb', key: 'missing-key' },
    { app: 'gdocs-web', key: 'missing-key' },
    { app: 'sccWeb', key: 'missing-key' },
    { app: 'procaixa-web', key: 'missing-key' },
    { app: 'simuladorwimo-web', key: 'missing-key' },
    { app: 'portalVue', key: 'acd70d4c-2037-416f-a79a-26711a02a3a1' },
  ];

  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    const appEntity = {
      PartitionKey: entGen.String(element.app),
      RowKey: entGen.String('Application'),
      InstrumentationKey: entGen.String(element.key),
    };

    tableSvc.insertOrMergeEntity(tableName, appEntity, onAppEntityInserted);
  }
};

function onAppEntityInserted(error, result, response) {
  if (error) {
    handleError(error);
  }

  console.log('result', result);
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
