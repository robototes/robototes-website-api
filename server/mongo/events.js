const debug = require('debug')
const MongoClient = require('mongodb').MongoClient
const joi = require('joi')

const eventsConfig = require('../../config/events')

const log = debug('robototes-website-api:mongodb')

class EventsManager {
  constructor (db) {
    this.db = db
  }
  async addEvent (event) {
    if (joi.validate(event, eventsConfig.schema).error == null) {
      // Get the documents collection
      var collection = this.db.collection('events')

      // Find some documents
      await collection.insert()
      log('Added event')
    }
  }
}

module.exports = async () => {
  let db = await MongoClient.connect(eventsConfig.databaseURI)
  log('Connected to database')

  return new EventsManager(db)
}
