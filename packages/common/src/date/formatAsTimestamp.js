const moment = require('moment')

module.exports = function formatAsTimestamp(dateValue) {
  if (!dateValue) {
    return dateValue
  }
  return moment(dateValue).toISOString()
}
