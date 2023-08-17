const mongoose = require('mongoose')
const PostConfig = require('./post.config')
const UserConfig = require('@root/api/user/user.config')

const PostSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserConfig.ModelName,
    },
  },
  { timestamps: true }
)

const Post = mongoose.model(PostConfig.ModelName, PostSchema)

module.exports = { Post }
