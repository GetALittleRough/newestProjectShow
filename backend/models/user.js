const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Image = require('./image').schema

const User = new Schema({
  username: String,
  mail: {
    type: String,
    required: true,
    unique: true
  },
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
  allimages: [Image],
  registerimages: [Image],
  monitorimages: [Image],
  notification: Number,
  registerDate: Date,
  publicKey: {
    required: true,
    unique: true,
    type: String
  },
  privateKey: {
    required: true,
    unique: true,
    type: String
  }
}, {collection: 'hypercool_users'})

module.exports = mongoose.model('User', User)