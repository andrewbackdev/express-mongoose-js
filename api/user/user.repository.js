'use strict'

const ObjectId = require('mongoose').Types.ObjectId
const { User } = require('./user.model')
const { Comment } = require('@root/api/comment/comment.model')
const { Post } = require('@root/api/post/post.model')

module.exports = {
  async find(filter) {
    const users = await User.find(filter, null, { lean: true }).exec()
    return users
  },

  async findOneById(id) {
    const user = await User.findOne({ _id: id }, null, {
      lean: true,
    }).exec()

    return user
  },

  /**
   *
   * @param {string} username
   * @returns
   */
  async findOneByUsername(username) {
    const user = await User.findOne({ username }, null, { lean: true }).exec()
    return user
  },

  async create(data) {
    const user = await User.create(data)
    return user.toObject()
  },

  /**
   *
   * @param {ObjectId} userId
   * @param {{
   *  username: string
   * }} data
   */
  async updateOneById(userId, data) {
    await User.updateOne({ _id: userId }, data)
  },

  async deleteById(id) {
    await Comment.deleteMany({ author: id })
    await Post.deleteMany({ author: id })
    await User.deleteOne({ _id: id })
  },
}
