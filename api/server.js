const path = require('path')
const express = require('express')
const boardsRouter = require('./boards/router')
const helmet = require('helmet')

const server = express()

server.use(express.json())
server.use(helmet())

server.use(express.static(path.join(__dirname, '../', 'frontend', 'dist')))

// API
server.use('/api/boards', boardsRouter)

// SPA
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

// 404
server.use('*', (req, res) => {
  res.status(404).json({ message: "What you are looking for is not here" })
})

// Error handling
server.use((err, req, res, next) => {
  let { message, stack, status } = err
  message = message || "Something unknown happened"
  stack = stack || "No stack trace"
  status = status || 500
  console.log(`\nERROR START =============\n
Message: ${message}
Status: ${status}
Stack: ${stack}
\nERROR END ===============\n`)

  res.status(status).json({ message, stack }) // Unsafe in prod
})

module.exports = server
