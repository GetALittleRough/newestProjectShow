const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  username: String,
  password: String,
  token: String,
  avatar: String,
  nickname: String,
}, {collection: 'hypercool_users'})

module.exports = mongoose.model('User', User)