const nconf = require('nconf')
const Mongolass = require('mongolass')

module.exports = {
  databaseURI: `mongodb://${nconf.get('DATABASE_USER')}:${nconf.get('DATABASE_PASS')}@${nconf.get('DATABASE_HOST')}:${nconf.get('DATABASE_PORT')}/${nconf.get('DATABASE_NAME')}`,
  schemas: {
    event: {
      id: { type: Mongolass.Types.ObjectId },
      name: { type: 'string' },
      data: { type: 'object' }
    }
  }
}
