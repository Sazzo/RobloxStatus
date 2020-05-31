const express = require('express')
const path = require('path')
const status = require('./status.js')
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000

status.start()
status.clearOutage()

const app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .use(cors())
  .set('view engine', 'ejs')
  .use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('pages/index', { status: status.getStatus(), haveOffline: status.haveOffline(), outage: status.currentOutage() })
})

app.get('/mobile', (req, res) => {
  res.render('pages/mobile/index', { status: status.getStatus(), haveOffline: status.haveOffline() })
})

app.get('/api/v1/all', (req, res) => {
  res.json(status.getStatus())
})

app.get('/api/v1/offline', (req, res) => {
  res.json(status.haveOffline())
})

app.get('/api/v1/outage', (req, res) => {
  console.log(status.currentOutage())
  if (!status.currentOutage()) {
  	res.json({
  		status: 'no_outage',
  		message: 'Currently, no outage is taking place.'
  	})
  } else {
  	res.json(status.currentOutage())
  }
})

app.post('/api/v1/publish', (req, res) => {
  if (req.headers['user-agent'].includes(process.env.SECRET)) {
  	res.json(status.outage(req.body.title, req.body.text))
  	console.log(status.currentOutage())
  	status.clearOutage()
  } else {
  	res.json({
  		message: 'Invalid Secret Key.'
  	})
  }
})
app.listen(PORT, () => console.log(`[WEBSERVER] Listening on port ${PORT}`))
