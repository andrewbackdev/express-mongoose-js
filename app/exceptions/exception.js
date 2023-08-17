class Exception extends Error {
  constructor({ status = 500, msg } = {}) {
    super(msg)

    this.status = status
    this.msg = msg

    return this
  }
}

module.exports = Exception
