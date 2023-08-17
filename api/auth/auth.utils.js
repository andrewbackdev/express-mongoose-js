const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { BcryptRounds, JwtSecret } = require('./auth.config')

module.exports = {
  signJwt(user) {
    return jwt.sign({ _id: user._id }, JwtSecret)
  },

  /**
   *
   * @param {string} token
   */
  decodeJwt(token) {
    return jwt.verify(token, JwtSecret)
  },

  /**
   *
   * @param {string} password
   */
  hashPassword(password) {
    return bcrypt.hash(password, BcryptRounds)
  },

  /**
   *
   * @param {string} password
   * @param {string} encryptedPassword
   */
  comparePassword(password, encryptedPassword) {
    return bcrypt.compare(password, encryptedPassword)
  },
}
