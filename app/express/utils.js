const { AllowedMethods } = require('../../config/cors')

module.exports = {
  validateRoute(route, routePath) {
    const { method, path, handler } = route
    if (!AllowedMethods.includes(method)) {
      throw new Error(`Method "${method}" is not allowed.
      Details:
      Route path: ${routePath},
      Route: ${JSON.stringify(route)}.
      Allowed methods: ${AllowedMethods.join(', ')}.
      `)
    }

    if (!path) {
      throw new Error(`Path "${path}" is invalid.
      Details:
      Route path: ${routePath},
      Route: ${JSON.stringify(route)}.
      `)
    }

    if (!handler) {
      throw new Error(`Handler "${handler}" is invalid.
      Details:
      Route path: ${routePath},
      Route: ${JSON.stringify(route)}.
      `)
    }
  },
}
