const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/short-url')

const app = express()
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

const PORT = 3000
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')



app.get('/', (req, res) => {
  res.send('hello world!')
})

app.listen(PORT, () => {
  console.log('App is running on http://localhost:3000')
})