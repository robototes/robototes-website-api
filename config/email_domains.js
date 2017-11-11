const nconf = require('nconf')

module.exports = [
  nconf.get('DOMAIN'),
  'bsd405.org'
]
