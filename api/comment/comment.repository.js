'use strict'

const { Comment } = require('./comment.model')

module.exports = {
  async find(filter) {
    const posts = await Comment.find(filter, null, { lean: true }).exec()
    return posts
  },

  async findOneById(id) {
    const comment = await Comment.findOne({ _id: id }, null, {
      lean: true,
    }).exec()

    return comment
  },

  async create(data) {
    return Comment.create(data)
  },

  async updateOneById(id, data) {
    await Comment.updateOne({ _id: id }, data)
  },

  async deleteById(id) {
    await Comment.deleteOne({ _id: id })
  },
}
