'use strict'

const PostServices = require('./post.service')

module.exports = {
  async find(req, res) {
    const posts = await PostServices.find(req.query)

    return res.json(posts)
  },

  async create(req, res) {
    const { title, body } = req.body
    const { _id: userId } = req.state.user

    const post = await PostServices.create({ userId, title, body })

    return res.json(post)
  },

  async update(req, res) {
    const { _id: userId } = req.state.user
    const { postId } = req.params

    const post = await PostServices.updateOne({
      userId,
      postId,
      data: req.body,
    })

    return res.json(post)
  },

  async delete(req, res) {
    const { postId } = req.params
    const { _id: userId } = req.state.user

    const post = await PostServices.delete({ userId, postId })

    return res.json(post)
  },
}
