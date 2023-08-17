'use strict'

const glob = require('glob')
const { validateRoute } = require('./utils')
const errorHandler = require('@root/app/middlewares/error-handler')
const routesGlobRegex = 'api/**/*.routes.js'

const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch((err) => {
    next(err)
  })
}

module.exports = (app) => {
  const routePaths = glob.sync(routesGlobRegex)

  const routes = routePaths.reduce((routes, routePath) => {
    const routeConfig = require('@root/' + routePath)

    routeConfig.forEach((route) => validateRoute(route, routePath))
    routes.push(...routeConfig)

    return routes
  }, [])

  for (const route of routes) {
    const { method, path, handler, config } = route
    const policies = config?.policies || []

    app[method.toLowerCase()](path, ...policies, asyncHandler(handler))
  }

  app.use(errorHandler)
}
