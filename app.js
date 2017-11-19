const nconf = require('nconf')
const debug = require('debug')
const server = require('./controllers/server')

const log = debug('robototes-website-api')

// Load configuration
nconf.env()
  .required([
    'PORT',
    'IP',
    'DOMAIN',
    'TBA_SECRET_KEY',
    'DATABASE_HOST',
    'DATABASE_PORT',
    'DATABASE_USER',
    'DATABASE_PASS',
    'DATABASE_NAME'
  ])
log('Loaded configuration')

// Start the server, and handle all fatal exceptions
try {
  server()
} catch (err) {
  log(err)
}
