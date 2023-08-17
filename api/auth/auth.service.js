'use strict'

const { BadRequestException } = require('@root/app/exceptions')
const UserRepository = require('@root/api/user/user.repository')
const { signJwt, hashPassword, comparePassword } = require('./auth.utils')

module.exports = {
  /**
   *
   * @param {{
   *  username: string
   *  password: string
   * }}
   * @returns
   */
  async register({ username, password }) {
    const exitedUser = await UserRepository.findOneByUsername(username)

    if (exitedUser) {
      throw new BadRequestException({ msg: 'username already taken' })
    }

    const hashedPassword = await hashPassword(password)

    const user = await UserRepository.create({
      username,
      password: hashedPassword,
    })

    const jwtToken = signJwt(user)

    return {
      jwt: jwtToken,
      user,
    }
  },

  /**
   *
   * @param {{
   *  username: string
   *  password: string
   * }}
   * @returns
   */
  async login({ username, password }) {
    const user = await UserRepository.findOneByUsername(username)

    if (!user) {
      throw new BadRequestException({
        msg: 'User with provided username and password is not found',
      })
    }

    const isPassMatch = await comparePassword(password, user.password)

    if (!isPassMatch) {
      throw new BadRequestException({
        msg: 'User with provided username and password is not found',
      })
    }

    const jwtToken = signJwt(user)

    return {
      jwt: jwtToken,
      user,
    }
  },
}
