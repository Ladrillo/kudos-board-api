const express = require('express')

const prisma = require('../prisma/prisma')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  res.json({ status: 'server is up' })
})

server.get('/api/boards', async (req, res, next) => {
  try {
    const boards = await prisma.Board.findMany({
      include: { cards: true }
    })
    res.json(boards)
  } catch (err) {
    next(err)
  }
})

server.post('/api/boards', async (req, res, next) => {
  try {
    const result = await prisma.Board.create({
      data: req.body,
    })
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
})

server.post('/api/boards/:id/cards', async (req, res, next) => {
  const { id } = req.params
  const { title, description, gif, owner } = req.body
  try {
    const result = await prisma.Card.create({
      data: { title, description, gif, owner, votes: 0, boardId: Number(id) },
    })
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
})

server.delete('/api/boards/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const result = await prisma.Board.delete({
      where: { id: Number(id) },
    })
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
})

server.delete('/api/boards/:boardId/cards/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const result = await prisma.Card.delete({
      where: { id: Number(id) },
    })
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
})

server.patch('/api/boards/:boardId/cards/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const result = await prisma.Card.update({
      where: { id: Number(id) },
      data: { votes: { increment: 1 } }
    })
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
})

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

  res.status(status).json({ message, stack })
})

module.exports = server
