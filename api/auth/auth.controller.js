'use strict'

const AuthService = require('./auth.service')
const { BadRequestException } = require('@root/app/exceptions')
const { sanitizeUser } = require('@root/api/user/user.utils')

module.exports = {
  async register(req, res) {
    const { username, password } = req.body

    if (!username) {
      throw new BadRequestException({ msg: 'username is missing' })
    }

    if (!password) {
      throw new BadRequestException({ msg: 'password is missing' })
    }

    const authRes = await AuthService.register({ username, password })
    authRes.user = sanitizeUser(authRes.user)

    return res.json(authRes)
  },

  async login(req, res) {
    const { username, password } = req.body

    if (!username) {
      throw new BadRequestException({ msg: 'username is missing' })
    }

    if (!password) {
      throw new BadRequestException({ msg: 'password is missing' })
    }

    const authRes = await AuthService.login({ username, password })
    authRes.user = sanitizeUser(authRes.user)

    res.json(authRes)
  },
}
