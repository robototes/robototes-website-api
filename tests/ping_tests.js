let response = { ping: 'pong' }

module.exports = test => {
  test.cb('Acknowledges GET requests (200)', t => {
    test.request.get('/api/ping')
      .expect(200)
      .expect(JSON.stringify(response), t.end)
  })
  test.cb('Acknowledges POST requests (200)', t => {
    test.request.get('/api/ping')
      .expect(200)
      .expect(JSON.stringify(response), t.end)
  })
}
