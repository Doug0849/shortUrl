const mongoose = require('mongoose')
const URL = require('../shortUrl')
mongoose.connect('mongodb://localhost/short-url')

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')

  for ( let i = 0; i < 10; i++) {
    URL.create({ url: `${i}` })
  }

  console.log('done.')
})