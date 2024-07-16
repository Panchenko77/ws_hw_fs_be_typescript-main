import config from './index';

const dbConfig = {
  ...config.database,
  synchronize: false,
};

module.exports = dbConfig;
