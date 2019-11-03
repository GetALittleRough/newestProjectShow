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
  owner: String,
  ipfs_hash: String,
  otherInfo: Object
}, {collection: 'image'})

module.exports = mongoose.model('Image', Image)