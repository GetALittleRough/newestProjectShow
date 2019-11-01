const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Image = new Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  owner: Schema.Types.ObjectId
}, {collection: 'hypercool_users'})

module.exports = mongoose.model('Image', Image)