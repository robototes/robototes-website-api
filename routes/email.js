const logEmail = require('debug')('robototes-website-api:email')
const nconf = require('nconf')
const validate = require('koa-joi-validate')
const joi = require('joi')

const emailDomains = require('../config/email_domains.js') // Allowed email domains

module.exports = router => {
  router.get('/email', validate({
    query: {
      alias: joi.string().required(),
      domain: joi.alternatives().try(joi.string().hostname().optional(), joi.string().ip({ cidr: 'forbidden' }).optional())
    }
  }), ctx => {
    // TODO Check CSRF

    if (ctx.query.domain && emailDomains.indexOf(ctx.query.domain) === -1) ctx.throw(400) // Make sure the domain is allowed
    let email = `${ctx.query.alias}@${ctx.query.domain || nconf.get('DOMAIN')}`

    if (joi.validate(email, joi.string().email()).error == null) {
      // Construct a mailto link with the body filled out with a referrer
      let mailtoLink = `mailto://${email}?body=%0A%0AI%20was%20referred%20to%20your%20email%20from%20www.${nconf.get('DOMAIN')}/contact`

      // Respond with the email
      logEmail(`Redirecting to "${mailtoLink}"`)
      ctx.status = 301
      ctx.redirect(mailtoLink)
      ctx.body = JSON.stringify(email)
    } else ctx.throw(400)
  })
}
