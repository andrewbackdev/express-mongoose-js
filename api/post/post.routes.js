const PostsController = require('./post.controller')
const { Methods } = require('@common')
const { authPolicy } = require('@root/app/policies')

/**
 * @type {import('../../common/api/routes').Routes}
 */
module.exports = [
  {
    method: Methods.GET,
    path: '/posts',
    handler: PostsController.find,
  },
  {
    method: Methods.POST,
    path: '/posts',
    handler: PostsController.create,
    config: {
      policies: [authPolicy],
    },
  },
  {
    method: Methods.PUT,
    path: '/posts/:postId',
    handler: PostsController.update,
    config: {
      policies: [authPolicy],
    },
  },
  {
    method: Methods.DELETE,
    path: '/posts/:postId',
    handler: PostsController.delete,
    config: {
      policies: [authPolicy],
    },
  },
]
