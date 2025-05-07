const express = require('express')

const prisma = require('../../prisma/prisma')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const boards = await prisma.Board.findMany({
      include: { cards: true },
    })
    res.json(boards)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const boards = await prisma.Board.findUnique({
      where: { id: Number(id) },
      include: { cards: true },
    })
    res.json(boards)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
  const result = await prisma.Board.create({
    data: req.body,
  })
  res.status(201).json(result)
} catch (err) {
  next(err)
}
})

router.post('/:id/cards', async (req, res, next) => {
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

router.delete('/:id', async (req, res, next) => {
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

router.delete('/:boardId/cards/:id', async (req, res, next) => {
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

router.patch('/:boardId/cards/:id', async (req, res, next) => {
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

module.exports = router
