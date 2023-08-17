const CommentController = require('./comment.controller')
const { Methods } = require('@common')
const { authPolicy } = require('@root/app/policies')

/**
 * @type {import('../../common/api/routes').Routes}
 */
module.exports = [
  {
    method: Methods.GET,
    path: '/comments',
    handler: CommentController.find,
  },
  {
    method: Methods.POST,
    path: '/comments',
    handler: CommentController.create,
    config: {
      policies: [authPolicy],
    },
  },
  {
    method: Methods.PUT,
    path: '/comments/:commentId',
    handler: CommentController.update,
    config: {
      policies: [authPolicy],
    },
  },
  {
    method: Methods.DELETE,
    path: '/comments/:commentId',
    handler: CommentController.delete,
    config: {
      policies: [authPolicy],
    },
  },
]
