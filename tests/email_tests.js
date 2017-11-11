const nconf = require('nconf')

module.exports = test => {
  test.cb('Ignores POST requests (405)', t => {
    test.request.post('/api/email')
      .expect(405, t.end)
  })
  test.cb('Denies requests without an alias (400)', t => {
    test.request.get('/api/email')
      .query({
        domain: 'example.com'
      })
      .expect(400, t.end)
  })
  test.cb('Assumes domain for requests without a hostname (400)', t => {
    test.request.get('/api/email')
      .query({
        alias: 'johndoe'
      })
      .expect('Location', `mailto://johndoe@${nconf.get('DOMAIN')}`)
      .expect(301, t.end)
  })
  test.cb('Denies empty requests (400)', t => {
    test.request.get('/api/email')
      .expect(400, t.end)
  })
  test.cb('Denies requests with invalid hostnames (400)', t => {
    test.request.get('/api/email')
      .query({
        alias: 'johndoe',
        domain: 'example@example.com'
      })
      .expect(400, t.end)
  })
  test.cb('Allows requests with an IP instead of a hostname (301)', t => {
    test.request.get('/api/email')
      .query({
        alias: 'johndoe',
        domain: '1.1.1.1'
      })
      .expect('Location', 'mailto://johndoe@1.1.1.1')
      .expect(301, t.end)
  })
  test.cb('Denies requests with invalid IPs as hostnames (400)', t => {
    test.request.get('/api/email')
      .query({
        alias: 'johndoe',
        domain: '1.#.1.1'
      })
      .expect(400, t.end)
  })
  test.cb('Denies requests with invalid aliases (400)', t => {
    test.request.get('/api/email')
      .query({
        alias: '.#@%^$.',
        domain: 'example.com'
      })
      .expect(400, t.end)
  })
  test.cb('Redirects when alias and hostname are valid (301)', t => {
    test.request.get('/api/email')
      .query({
        alias: 'johndoe',
        domain: 'example.com'
      })
      .expect(301, t.end)
  })
}
