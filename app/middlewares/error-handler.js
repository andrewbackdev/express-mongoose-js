const { Exception } = require('@root/app/exceptions')
const Logger = require('@logger')

// For bind-routes
module.exports = (err, req, res, next) => {
  Logger.error(err)

  if (err instanceof Exception) {
    res.status(err.status).json({
      message: err.msg,
    })
  } else {
    res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}
