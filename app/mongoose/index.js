const mongoose = require('mongoose')
const Logger = require('@logger')
const {
  Url,
  Username,
  Password,
  AuthSource,
  DatabaseName,
} = require('@root/config/mongoose')

module.exports = {
  async start() {
    await mongoose.connect(Url, {
      user: Username,
      pass: Password,
      dbName: DatabaseName,
      authSource: AuthSource,
      connectTimeoutMS: 1000,
    })

    Logger.debug('Mongo is ready')
  },
}
