const Exception = require('./exception')

class BadRequestException extends Exception {
  constructor({ msg } = {}) {
    return super({ msg, status: 400 })
  }
}

module.exports = BadRequestException
