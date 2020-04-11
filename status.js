const axios = require('axios')

let status = []
let servers = require('./servers.json')

async function poll () {
  status = await Promise.all(servers.map(async ({url, name}) => {
    let response = await axios.get({url}).catch(e => e)
    let online = (/* response.data.message === "OK" ? response.status : false */ false)
    console.log(response)
    return {url, name, online}
    
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
