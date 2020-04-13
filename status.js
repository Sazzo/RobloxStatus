const axios = require('axios')

let status = []
let servers = require('./servers.json')
let online = false
let existLast = false
let last = []
let date = Date()
let time = date.toString()

async function poll () {
  status = await Promise.all(servers.map(async ({url, name, type}) => {
    let response = await axios.get(url).catch(e => e)
    switch(type) {
      case "api":
        online = (response.data.message === "OK" || response.statusText === "OK" ? true : false)
        if(online === false) {
          existLast = true
          last = {name, type, time}
        }
      break;
      case "website":
        online = (response.status === 200 ? true : false)
        if(online === false) {
          existLast = true
          last = {name, type, time}
        }
      break;
      case "star":
        online = true
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

async function getIncident () {
  if(!existLast) {
    return { existLast }
  }
  return last
}

module.exports = {start, getStatus, getIncident}
