const express = require('express')

const server = express()

server.use(express.json())

const boardsRouter = require('./boards/router')

server.get('/', (req, res) => {
  res.json({ status: 'server is up' })
})

server.use('/api/boards', boardsRouter)

server.use((err, req, res, next) => { // error handling
  let { message, stack, status } = err
  message = message || "Something unknown happened"
  stack = stack || "No stack trace"
  status = status || 500
  console.log(`\nERROR START =============\n
Message: ${message}
Status: ${status}
Stack: ${stack}
\nERROR END ===============\n`)

  res.status(status).json({ message, stack })
})

module.exports = server
