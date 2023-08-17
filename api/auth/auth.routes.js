const AuthController = require('./auth.controller')
const { Methods } = require('@common')

/**
 * @type {import('../../common/api/routes').Routes}
 */
module.exports = [
  {
    method: Methods.POST,
    path: '/auth/register',
    handler: AuthController.register,
  },
  {
    method: Methods.POST,
    path: '/auth/login',
    handler: AuthController.login,
  },
]
