'use strict'

const _ = require('lodash')
const ObjectId = require('mongoose').Types.ObjectId
const {
  BadRequestException,
  NotFoundException,
} = require('@root/app/exceptions/index.js')
const CommentRepository = require('./comment.repository.js')
const { sanitizeComment } = require('./comment.utils')

module.exports = {
  /**
   *
   * @param {{
   *  author: ObjectId
   *  post: ObjectId
   * }} dirtyFilter
   * @returns
   */
  async find(dirtyFilter) {
    const filter = _.pick(dirtyFilter, ['author', 'post'])
    const { author, post } = filter

    if (author && !ObjectId.isValid(author)) {
      throw new BadRequestException({ msg: 'author is not valid' })
    }

    if (post && !ObjectId.isValid(post)) {
      throw new BadRequestException({ msg: 'post is not valid' })
    }

    const comments = await CommentRepository.find(filter)

    const sanitizedComments = comments.map(sanitizeComment)
    return sanitizedComments
  },

  /**
   *
   * @param {{
   *  userId: ObjectId
   *  postId: ObjectId
   *  content: string
   * }} data
   * @returns
   */
  async create(data) {
    const { userId, postId, content } = data

    if (!postId) {
      throw new BadRequestException({ msg: 'postId is required' })
    }

    if (!ObjectId.isValid(postId)) {
      throw new BadRequestException({ msg: 'postId is not valid' })
    }

    if (!content) {
      throw new BadRequestException({ msg: 'content is required' })
    }

    const comment = await CommentRepository.create({
      content,
      author: userId,
      post: postId,
    })

    const sanitizedComment = sanitizeComment(comment)
    return sanitizedComment
  },

  /**
   *
   * @param {{
   *  userId: ObjectId
   *  commentId: ObjectId
   *  data: {
   *    content: string
   *  }
   * }} data
   * @returns
   */
  async updateOne({ userId, commentId, data: dirtyData }) {
    const data = _.pick(dirtyData, ['content'])

    if (_.isEmpty(data)) {
      throw new BadRequestException({ msg: 'content is required' })
    }

    const comment = await CommentRepository.findOneById(commentId)

    if (!comment) {
      throw new NotFoundException({ msg: 'comment not found' })
    }

    if (!comment.author.equals(userId)) {
      throw new BadRequestException({
        msg: 'Missing permissions to update commend',
      })
    }

    await CommentRepository.updateOneById(commentId, data)

    Object.assign(comment, data)
    const sanitizedComment = sanitizeComment(comment)
    return sanitizedComment
  },

  /**
   *
   * @param {{
   *  userId: ObjectId
   *  commentId: ObjectId
   * }} param0
   * @returns
   */
  async delete({ userId, commentId }) {
    const comment = await CommentRepository.findOneById(commentId)

    if (!comment) {
      throw new NotFoundException({ msg: 'comment not found' })
    }

    if (!comment.author.equals(userId)) {
      throw new BadRequestException({
        msg: 'Missing permissions to delete comment ',
      })
    }

    await CommentRepository.deleteById(commentId)

    const sanitizedComment = sanitizeComment(comment)
    return sanitizedComment
  },
}
