<h1 align="center">📡 Roblox Status</h1>
<p align="center">
  <strong>The unofficial page designed to show the current status of the main services of Roblox.</strong>
  <br>
  <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"></img>
</p>

## Why?
Among several companies, like Discord, Github and many others, why doesn't Roblox have a page that shows the status of API's, talks to the user about problems through posts or anything like that? Okay, you can tell me that there are sites that report the status of the website, but there comes a problem, besides being incomplete since it relates about website and not internal services like APIs or even services closer to Roblox like devforum, besides do not have a very good user interface and is based on reports, since nobody has done it, we are here to try to be as accurate as possible and do the work that is not currently done officially by the Roblox platform development team.

## How to contribute to development?
It's simple, follow the Standard code style and show why you want it to be added, if it's a bug fix just show a screenshot and steps for it to happen. Fork our project and give your fork a `` git clone``, after that, just send a pull request here.
```
$ npm install
$ node index.js
```

- About the projects:
When we are planning something big, like many changes, we always create a project page with everything that is in progress, or needs to be done, on hold or that is already complete! Take a look [here](https://github.com/Sazzo/RobloxStatus/projects)!

## Public API
We currently have a public API and we are working to make it ready as possible with documentation (like the Statuspage), however, here is an endpoint to take a look at the current status:
```
/api/v1/statuses
```
Will reply:
```json
[{"url":"service url","name":"service name","online":true,"type":"service type (like website)","reason":"ignore this, it will be withdrawn soon (="}]
```

## Copyright
This website/repository is unofficial and is not related and/or affiliated in any way to Roblox or the Roblox Corporation. All Roblox-related logos and names are the property of Roblox Corporation. All rights reserved.
