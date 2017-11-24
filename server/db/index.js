const debug = require('debug')
const Mongolass = require('mongolass')
const event = require('./models/event')

const dbConfig = require('../../config/db')

const log = debug('robototes-website-api:database')

module.exports = async () => {
  let db = await new Mongolass(dbConfig.databaseURI)
  log('Connected to database')

  // Connect models
  await event(db)
  log('Registered models')

  return db
}
