const axios = require('axios')

let status = []
let servers = require('./servers.json')
let online = false

async function poll () {
  status = await Promise.all(servers.map(async ({url, name, type}) => {
    let response = await axios.get(url).catch(e => e)
    switch(type) {
      case "api":
        online = (response.data.message === "OK" ? response.status : false)
      break;
      case "website":
        online = (response.status === 200 || response.status === 404 ||response.status === 403 ? response.status : false)
      break;
      case "star":
        online = (response.status === 403 ? response.status : false)
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
