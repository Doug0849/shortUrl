const express = require('express')
const exphbs = require('express-handlebars')
const shortenUrl = require('./utility/shortenUrl')
const ShortUrl = require('./models/shortUrl')

const app = express()
const PORT = 3000
require('./config/mongoose')

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/url', (req, res) => {
  if (!req.body.url) return res.redirect("/")
  let { url } = req.body
  if (!(url.includes('https://') || url.includes('http://'))) {
    url = 'https://' + req.body.url
  }
  const shortUrl = shortenUrl(5)
  const hostUrl = req.headers.host + '/'
  ShortUrl.findOne({ url })
    .then(result => {
      if (!result) {
        return ShortUrl.create({ url, shortUrl })
      } else {
        return result
      }
    }).then(result => {
      const shortUrl = result.shortUrl
      res.render('index', { hostUrl, shortUrl })
    })
})

app.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl
  ShortUrl.findOne({ shortUrl })
    .then(result => {
      if (result) {
        return res.redirect(result.url)
      } else {
        return res.render('index', { noShortUrl: true })
      }
    })
})

app.listen(PORT, () => {
  console.log('App is running on http://localhost:3000')
})