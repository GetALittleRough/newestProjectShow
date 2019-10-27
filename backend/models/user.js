const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  username: String,
  password: String,
  token: String,
  avatar: String,
  nickname: String,
  workCount: Number,
  registerCount: Number,
  monitorCount: Number,
  age: Number,
  residence: String,
  jobTitle: String,
  workplace: String,
  self_introduction: String,
  images: [Object],
  notification: Number
}, {collection: 'hypercool_users'})

module.exports = mongoose.model('User', User)