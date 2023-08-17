'use strict'
const { sanitizeEntity } = require('@app/common/utils')

module.exports = {
  sanitizeComment(comment) {
    sanitizeEntity(comment)

    return comment
  },
}
