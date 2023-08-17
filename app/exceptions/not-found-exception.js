const Exception = require('./exception')

class NotFoundException extends Exception {
  constructor({ msg } = {}) {
    return super({ msg, status: 404 })
  }
}

module.exports = NotFoundException
