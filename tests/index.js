const test = require('ava').test // Testing function
const supertest = require('supertest') // Routing testing

process.env.DEBUG = null
const app = require('../server') // Our server

test.request = supertest(app) // Routing

// Overall tests
test.cb('Ignores requests to non-existent API endpoints', t => {
  test.request.post('/api/foo')
    .expect(404, t.end)
})

// TBA Tests
require('./tba_tests')(test)
require('./email_tests')(test)
