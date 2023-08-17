const express = require('express')
const Logger = require('@logger')
const { Url, Port } = require('@config/server')

const app = express()

module.exports = {
  start() {
    require('../middlewares')(app)
    require('./bind-routes')(app)

    return new Promise((resolve) => {
      app.listen(Port, () => {
        Logger.debug(`Example app listening at ${Url}`)
        resolve()
      })
    })
  },
}
