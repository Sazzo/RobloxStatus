const express = require('express')
const path = require('path')
const status = require('./status.js')
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000

status.start()

const app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .use(cors())
  .set('view engine', 'ejs')
  .use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('pages/index', { status: status.getStatus(), haveOffline: status.haveOffline() })
})

app.get('/api/v1/statuses', (req, res) => {
  res.json(status.getStatus())
})

/* ignore this lol
app.get('/api/v1/geral', (req, res) => {
  res.json(status.haveOffline())
})

app.get('/api/v1/currentOutage', (req, res) => {
  if (status.haveOffline() == false) {
  	res.json({
  		status: 'no_outage',
  		message: 'Currently, no outage is taking place.'
  	})
  } else {
  	res.json(status.currentOutage())
  }
})

 app.post('/api/v1/publish', (req, res) => {
  if (!req.body.password) {
    return res.json({
      message: 'Invalid Password'
    })
    if (!req.body.password == '') {
      return res.json({
        message: 'Wrong Password'
      })
    }
    res.json(status.outage(req.body.title, req.body.text))
    console.log(status.currentOutage())
  }
})
*/
app.listen(PORT, () => console.log(`[WEBSERVER] Listening on port ${PORT}`))
