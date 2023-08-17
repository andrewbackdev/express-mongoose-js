'use strict'
const { sanitizeEntity } = require('@app/common/utils')

module.exports = {
  sanitizeUser(user) {
    sanitizeEntity(user)

    delete user.password
    delete user.email

    return user
  },

  sanitizeForOwner(user) {
    sanitizeEntity(user)

    delete user.password

    return user
  },
}
