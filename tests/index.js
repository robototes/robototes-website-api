const test = require('ava').test // Testing function
const supertest = require('supertest') // Routing testing
const nconf = require('nconf')

const server = require('../controllers/server')

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

test.before(async () => {
  process.env.DEBUG = null

  let app = await server() // Our server

  test.request = supertest(app) // Routing
})

// Overall tests
test.cb('Ignores requests to non-existent API endpoints', t => {
  test.request.post('/api/foo')
    .expect(404, t.end)
})

// TBA Tests
require('./tba_tests')(test)
require('./email_tests')(test)
