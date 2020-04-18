const express = require('express')
const path = require('path')
const status = require('./status.js')
const cors = require("cors")
const PORT = process.env.PORT || 5000

status.start()

var app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .use(cors())
  .set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('pages/index', { status: status.getStatus() })
})

app.get('/api/v1/statuses', (req, res) => {
  res.json(status.getStatus())
})

app.listen(PORT, () => console.log(`[WEBSERVER] Listening on port ${PORT}`))
