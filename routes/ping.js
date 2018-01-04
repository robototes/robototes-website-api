const logPing = require('debug')('robototes-website-api:ping')

module.exports = router => {
  router.all('/ping', ctx => {
    logPing('Received ping')
    ctx.status = 200
    ctx.body = JSON.stringify({ ping: 'pong' })
  })
}
