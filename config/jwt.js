const env = require('./env')

module.exports = {
  JwtSecret: env('JWT_SECRET'),
}
