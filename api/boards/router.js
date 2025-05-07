const express = require('express')

const { validateBoardId, validateCardId } = require('./middleware')

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

router.get('/:boardId', validateBoardId, async (req, res, next) => {
  res.json(req.board)
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

router.post('/:boardId/cards', validateBoardId, async (req, res, next) => {
  const { title, description, gif, owner } = req.body
  try {
    const result = await prisma.Card.create({
      data: { title, description, gif, owner, votes: 0, boardId: req.board.id },
    })
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
})

router.delete('/:boardId', validateBoardId, async (req, res, next) => {
  try {
    const result = await prisma.Board.delete({
      where: { id: req.board.id },
    })
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
})

router.delete('/:boardId/cards/:cardId', validateBoardId, validateCardId, async (req, res, next) => {
  const { cardId } = req.params
  try {
    const result = await prisma.Card.delete({
      where: { id: Number(cardId) },
    })
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
})

router.patch('/:boardId/cards/:cardId', validateBoardId, validateCardId, async (req, res, next) => {
  const { cardId } = req.params
  try {
    const result = await prisma.Card.update({
      where: { id: Number(cardId) },
      data: { votes: { increment: 1 } }
    })
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
})

module.exports = router
