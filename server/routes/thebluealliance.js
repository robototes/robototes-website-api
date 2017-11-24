const debug = require('debug')
const nconf = require('nconf')
const crypto = require('crypto')
const validate = require('koa-joi-validate')
const joi = require('joi')
const db = require('../db/')

const log = debug('robototes-website-api:thebluealliance')

module.exports = async router => {
  const event = (await db()).model('Event') // Prepare our database collection for queries

  router.post('/tba', validate({
    headers: {
      'x-tba-checksum': joi.string().length(40).required()
    },
    body: {
      message_type: joi.string().required(),
      message_data: joi.object().required()
    }
  }), async ctx => {
    let message = ctx.request.body

    // Verify that the request is from TBA and has not been tampered with
    let hash = crypto.createHash('sha1')
    hash.update(nconf.get('TBA_SECRET_KEY'))
    hash.update(ctx.request.rawBody)

    if (hash.digest('hex') === ctx.request.headers['x-tba-checksum']) {
      let data = message.message_data
      switch (message.message_type) {
        case 'upcoming_match':
          ctx.status = 200
          if (data.team_keys.indexOf('frc2412') !== -1) {
            await event.insertOne({
              name: 'upcoming_match',
              data: {
                match_name: data.event_name,
                match_key: data.match_key,
                scheduled_time: data.scheduled_time,
                predicted_time: data.predicted_time
              }
            }).exec()
          }
          break
        case 'match_score':
          // TODO Add record to database
          ctx.status = 200
          break
        case 'starting_comp_level':
          ctx.status = 200
          break
        case 'alliance_selection':
          ctx.status = 200
          break
        case 'awards_posted':
          ctx.status = 200
          break
        case 'media_posted':
          return ctx.throw(501)
        case 'district_points_updated':
          return ctx.throw(501)
        case 'schedule_updated':
          ctx.status = 200
          break
        case 'final_results':
          return ctx.throw(501)
        case 'ping':
          log('Ping received from The Blue Alliance')
          ctx.status = 200
          break
        case 'broadcast':
          ctx.status = 200
          break
        case 'verification':
          log('Verification code received:', ctx.request.body.message_data.verification_key)
          ctx.status = 200
          break
        default:
          log(ctx.request.body)
          ctx.status = 400
      }
    } else {
      ctx.throw(403)
    }
  })
}
