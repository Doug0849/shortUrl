const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shortUrlSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
  }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)