const mongoose = require('mongoose')
const CommentConfig = require('./comment.config')
const UserConfig = require('@root/api/user/user.config')
const PostConfig = require('@root/api/post/post.config')

const PostSchema = new mongoose.Schema(
  {
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserConfig.ModelName,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: PostConfig.ModelName,
    },
  },
  { timestamps: true }
)

const Comment = mongoose.model(CommentConfig.ModelName, PostSchema)

module.exports = { Comment }
