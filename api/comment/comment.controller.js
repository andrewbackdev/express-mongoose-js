'use strict'

const CommentService = require('./comment.service')

module.exports = {
  async find(req, res) {
    const comments = await CommentService.find(req.query)

    return res.json(comments)
  },

  async create(req, res) {
    const { _id: userId } = req.state.user
    const { postId, content } = req.body

    const comment = await CommentService.create({ userId, postId, content })

    return res.json(comment)
  },

  async update(req, res) {
    const { _id: userId } = req.state.user
    const { commentId } = req.params

    const comment = await CommentService.updateOne({
      userId,
      commentId,
      data: req.body,
    })

    return res.json(comment)
  },

  async delete(req, res) {
    const { _id: userId } = req.state.user
    const { commentId } = req.params

    const comment = await CommentService.delete({ userId, commentId })

    return res.json(comment)
  },
}
