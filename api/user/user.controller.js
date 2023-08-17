'use strict'

const UserServices = require('./user.service')

module.exports = {
  async find(req, res) {
    const users = await UserServices.find(req.query)

    return res.json(users)
  },

  async me(req, res) {
    const { _id: userId } = req.state.user

    const user = await UserServices.me(userId)

    return res.json(user)
  },

  async update(req, res) {
    const { _id: userId } = req.state.user
    const { username } = req.body

    const user = await UserServices.updateOneById(userId, { username })

    return res.json(user)
  },

  async delete(req, res) {
    const { _id: userId } = req.state.user

    const user = await UserServices.delete(userId)

    return res.json(user)
  },
}
