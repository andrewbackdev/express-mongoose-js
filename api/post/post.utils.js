'use strict'
const { sanitizeEntity } = require('@app/common/utils')

module.exports = {
  sanitizePost(post) {
    sanitizeEntity(post)

    return post
  },
}
