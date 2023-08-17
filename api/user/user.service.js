'use strict'

const ObjectId = require('mongoose').Types.ObjectId
const {
  NotFoundException,
  BadRequestException,
} = require('@root/app/exceptions')
const UserRepository = require('./user.repository')

const { sanitizeUser, sanitizeForOwner } = require('./user.utils')

module.exports = {
  async find() {
    const users = await UserRepository.find()
    const sanitizedUsers = users.map(sanitizeUser)

    return sanitizedUsers
  },

  /**
   *
   * @param {ObjectId} id
   * @returns
   */
  async findOneById(id) {
    return UserRepository.findOneById(id)
  },

  /**
   *
   * @param {ObjectId} id
   * @returns
   */
  async me(id) {
    const user = await UserRepository.findOneById(id)
    const sanitizedUser = sanitizeForOwner(user)

    return sanitizedUser
  },

  /**
   *
   * @param {ObjectId} userId
   * @param {{
   *  username: string
   * }} data
   * @returns
   */
  async updateOneById(userId, data) {
    const { username } = data

    if (!username) {
      throw new BadRequestException({ msg: 'username is required' })
    }

    const exitedUser = await UserRepository.findOneByUsername(username)

    if (exitedUser) {
      throw new BadRequestException({ msg: 'username already taken' })
    }

    const user = await UserRepository.findOneById(userId)
    await UserRepository.updateOneById(userId, { username })

    Object.assign(user, { username })
    const sanitizedUser = sanitizeForOwner(user)
    return sanitizedUser
  },

  /**
   *
   * @param {ObjectId} id
   * @returns
   */
  async delete(id) {
    const user = await UserRepository.findOneById(id)

    if (!user) {
      throw new NotFoundException({ msg: 'user not found' })
    }

    await UserRepository.deleteById(id)

    const sanitizedUser = sanitizeForOwner(user)
    return sanitizedUser
  },
}
