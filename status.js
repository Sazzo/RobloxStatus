const axios = require('axios')
let status = []
const servers = require('./servers.json')
let online = false
let someOffline = false
let statusTitle = null
let statusText = null
let statusParams = false

async function poll () {
  status = await Promise.all(servers.map(async ({ url, name, type }) => {
    const response = await axios.get(url).catch(e => e)
    switch (type) {
      case 'api':
        online = (!!(response.data.message === 'OK' || response.statusText === 'OK' || response.data === 'ok'))
        if (!online) {
          someOffline = true
        } else {
          someOffline = false
        }
        break
      case 'website':
        online = (response.status === 200 || response.status === 204 || response.status === 203)
        if (!online) {
          someOffline = true
        } else {
          someOffline = false
        }
        break
    }
    return { url, name, online, type }
  }))
}

function start () {
  poll()
  setInterval(poll, 60000)
}

function getStatus () {
  return status
}
// ignore this lol
function haveOffline () {
  return someOffline
}

function outage (outageTitle, outageDescription) {
  statusTitle = outageTitle
  statusText = outageDescription
  statusParams = { statusTitle, statusText }
  return statusParams
}

function clearOutage () {
  console.log('ClearOutage started.')
  setInterval(function () {
    if (statusParams) {
      statusParams = false
      console.log('Set Outage to False.')
    } else {
      console.log('No Outage.')
    }
  }, 1000 * 60 * 60)
}

function currentOutage () {
  if (!statusParams) {
    return false
  } else {
    return statusParams
  }
}

module.exports = { start, getStatus, haveOffline, outage, currentOutage, clearOutage }
