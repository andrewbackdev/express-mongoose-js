require('module-alias/register')
require('dotenv').config({ path: process.env.ENV_PATH })

const mongo = require('./app/mongoose')
const app = require('./app/express')

module.exports = {
  async start() {
    await app.start()
    await mongo.start()
  },
}
