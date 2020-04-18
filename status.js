const axios = require('axios')

let status = []
let servers = require('./servers.json')
let online = true

async function poll () {
  status = await Promise.all(servers.map(async ({url, name, type, props}) => {
    let response = await axios.get(url).catch(e => e)
    switch(type) {
      case "api":
        online = (response.data.message === "OK" || response.statusText === "OK" ? true : false)
      break;
      case "website":
        online = (response.status === 200 ? true : false)
      break;
    }
    return {url, name, online, type}
  }))
}

function start () {
  poll()
  setInterval(poll, 60000)
}

function getStatus () {
  return status
}

module.exports = {start, getStatus}
