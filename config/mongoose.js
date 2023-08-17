const env = require('./env')

module.exports = {
  Url: env('MONGO_URL'),
  Username: env('MONGO_USERNAME'),
  Password: env('MONGO_PASSWORD'),
  DatabaseName: env('MONGO_DATABASE_NAME'),
  AuthSource: env('MONGO_AUTH_SOURCE'),
}
