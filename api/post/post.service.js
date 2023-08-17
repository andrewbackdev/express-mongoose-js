'use strict'

const _ = require('lodash')
const ObjectId = require('mongoose').Types.ObjectId
const {
  BadRequestException,
  NotFoundException,
} = require('@root/app/exceptions')
const PostRepository = require('./post.repository')
const { sanitizePost } = require('./post.utils')

module.exports = {
  /**
   *
   * @param {{
   *  author: ObjectId
   * }} dirtyFilter
   * @returns
   */
  async find(dirtyFilter) {
    const filter = _.pick(dirtyFilter, ['author'])
    const { author } = filter

    if (author && !ObjectId.isValid(author)) {
      throw new BadRequestException({ msg: 'author is not valid' })
    }

    const posts = await PostRepository.find(filter)

    const sanitizedPosts = posts.map(sanitizePost)

    return sanitizedPosts
  },

  /**
   *
   * @param {{
   *  userId: ObjectId
   *  title: string
   *  body: string
   * }} data
   * @returns
   */
  async create(data) {
    const { userId, title, body } = data

    if (!title) {
      throw new BadRequestException({ msg: 'title is required' })
    }

    if (!body) {
      throw new BadRequestException({ msg: 'body is required' })
    }

    const post = await PostRepository.create({
      title,
      body,
      author: userId,
    })

    const sanitizedPost = sanitizePost(post)

    return sanitizedPost
  },

  async updateOne({ userId, postId, data: dirtyData }) {
    const data = _.pick(dirtyData, ['title', 'body'])

    if (_.isEmpty(data)) {
      throw new BadRequestException({ msg: 'update requires title or body' })
    }

    const post = await PostRepository.findOneById(postId)

    if (!post) {
      throw new NotFoundException({ msg: 'post not found' })
    }

    if (!post.author.equals(userId)) {
      throw new BadRequestException({
        msg: 'Missing permissions to update post',
      })
    }

    await PostRepository.updateOneById(postId, data)

    Object.assign(post, data)
    const sanitizedPost = sanitizePost(post)
    return sanitizedPost
  },

  /**
   *
   * @param {{
   *  userId: ObjectId
   *  postId: ObjectId
   * }} param0
   * @returns
   */
  async delete({ userId, postId }) {
    const post = await PostRepository.findOneById(postId)

    if (!post) {
      throw new NotFoundException({ msg: 'Post not found' })
    }

    if (!post.author.equals(userId)) {
      throw new BadRequestException({
        msg: 'Missing permissions to delete post',
      })
    }

    await PostRepository.deleteById(postId)

    const sanitizedPost = sanitizePost(post)
    return sanitizedPost
  },
}
