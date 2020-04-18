const axios = require('axios')
let status = []
const servers = require('./servers.json')
let online = false
let reason = "Unknown Reason"

async function poll () {
  status = await Promise.all(servers.map(async ({url, name, type}) => {
    let response = await axios.get(url).catch(e => e)
    switch(type) {
      case "api":
        online = (response.data.message === "OK" || response.statusText === "OK" ? true : false)
        switch(response.status) {
          case 403:
          reason = "Maybe Server Crash"
          break;
          case 400:
          reason = "Server Crash"
          break;
          case 408:
          reason = "Timeout"
          break;
          case 429:
          reason = "Unknown error, please send a DM with a screenshot of this error to sazz#1660 Discord."
          break;
         }
      break;
      case "website":
        online = (response.status === 200 ? true : false)
        switch(response.status) {
          case 403:
          reason = "Maybe Server Crash"
          break;
          case 400:
          reason = "Server Crash"
          break;
          case 408:
          reason = "Timeout"
          break;
          case 429:
          reason = "Unknown error, please send a DM with a screenshot of this error to sazz#1660 Discord."
          break;
        }
      break;
    }
    return {url, name, online, type, reason}
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
