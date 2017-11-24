const dbConfig = require('../../../config/db')

module.exports = async (db) => {
  await db.model('Event', dbConfig.schemas.event, { collName: 'events' })
}
