const logEmail = require('debug')('robototes-website-api:email')
const nconf = require('nconf')
const validate = require('koa-joi-validate')
const joi = require('joi')

module.exports = router => {
  router.get('/email', validate({
    query: {
      alias: joi.string().required(),
      domain: joi.alternatives().try(joi.string().hostname().optional(), joi.string().ip({ cidr: 'forbidden' }).optional())
    }
  }), ctx => {
    // TODO Check CSRF
    let email = `${ctx.query.alias}@${ctx.query.domain || nconf.get('DOMAIN')}`
    logEmail(`Redirecting to "mailto:${email}"`)

    if (joi.validate(email, joi.string().email()).error == null) {
      // Respond with the email
      ctx.status = 301
      ctx.redirect(`mailto://${email}`)
      ctx.body = JSON.stringify(email)
    } else {
      ctx.throw(400)
    }
  })
}
