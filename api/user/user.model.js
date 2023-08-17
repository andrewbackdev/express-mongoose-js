const { Schema, model } = require('mongoose')
const UserConfig = require('./user.config')

const UserSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  { timestamps: true }
)

const User = model(UserConfig.ModelName, UserSchema)
module.exports = { User }
