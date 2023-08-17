const env = require('./env')

module.exports = {
  Url: env('BACKEND_URL'),
  Port: env.number('BACKEND_PORT'),
}
