const express = require("express");
const server = express();
const bodyParser = require('body-parser')

const createEchoResponse = require('./create-echo-response.js')

console.log("server will start on port: ", process.env.PORT)

server
  .use(bodyParser.json())
  .post("/webhook", (req, res) => {
    console.log('request received')
    return res.json(createEchoResponse(req.body))
  })
  .listen(process.env.PORT)