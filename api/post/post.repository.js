'use strict'

const { Post } = require('./post.model')
const { Comment } = require('@root/api/comment/comment.model')

module.exports = {
  async find(filter) {
    const posts = await Post.find(filter, null, { lean: true }).exec()
    return posts
  },

  async findOneById(id) {
    const post = await Post.findOne({ _id: id }, null, { lean: true }).exec()
    return post
  },
  async create(data) {
    return Post.create(data)
  },

  async updateOneById(postId, data) {
    await Post.updateOne({ _id: postId }, data)
  },

  async deleteById(id) {
    await Comment.deleteMany({ post: id })
    await Post.deleteOne({ _id: id })
  },
}
