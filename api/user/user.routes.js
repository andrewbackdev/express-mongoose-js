const UserController = require('./user.controller')
const { Methods } = require('@common')
const { authPolicy } = require('@root/app/policies')

/**
 * @type {import('../../common/api/routes').Routes}
 */
module.exports = [
  {
    method: Methods.GET,
    path: '/users',
    handler: UserController.find,
  },
  {
    method: Methods.GET,
    path: '/users/me',
    handler: UserController.me,
    config: {
      policies: [authPolicy],
    },
  },
  {
    method: Methods.PUT,
    path: '/users',
    handler: UserController.update,
    config: {
      policies: [authPolicy],
    },
  },
  {
    method: Methods.DELETE,
    path: '/users',
    handler: UserController.delete,
    config: {
      policies: [authPolicy],
    },
  },
]
