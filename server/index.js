const express = require('express')
const consola = require('consola')
const mongoose = require('mongoose')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const parser = require("body-parser")
app.use( parser.json() )
app.use(parser.urlencoded({
  extended: true
}));

var ticketHandler = require("./controller/ticket-controller.js")
var loginHandler = require("./controller/login-controller.js")


app.use('/tickets', ticketHandler)
app.use('/login', loginHandler)

//externalise to nuxt config
mongoose.connect('mongodb://localhost:27017/helpdesk', { useNewUrlParser: true })

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
