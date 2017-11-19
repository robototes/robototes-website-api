const nconf = require('nconf')
// const joi = require('joi')

module.exports = {
  databaseURI: `mongodb://${nconf.get('DATABASE_USER')}:${nconf.get('DATABASE_PASS')}@${nconf.get('DATABASE_HOST')}:${nconf.get('DATABASE_PORT')}/${nconf.get('DATABASE_NAME')}`,
  schema: {

  }
}
