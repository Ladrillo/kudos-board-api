const prisma = require('../../prisma/prisma')
const { createBoardSchema } = require('../schemas/board')
const { createCardSchema } = require('../schemas/card')

const validateBoardPayload = async (req, res, next) => {
  try {
    const cast = await createBoardSchema.validate(req.body, { stripUnknown: true })
    req.board = cast
    next()
  } catch (err) {
    next({ status: 422, message: err.message })
  }
}

const validateCardPayload = async (req, res, next) => {
  try {
    const cast = await createCardSchema.validate(req.body, { stripUnknown: true })
    req.card = cast
    next()
  } catch (err) {
    next({ status: 422, message: err.message })
  }
}

const validateBoardId = async (req, res, next) => {
  const { boardId } = req.params
  try {
    const board = await prisma.Board.findUnique({
      where: { id: Number(boardId) },
      include: { cards: true },
    })
    if (!board) {
      return next({ status: 404, message: 'Board not found' })
    }
    req.board = board
    next()
  } catch (err) {
    next(err)
  }
}

const validateCardId = async (req, res, next) => {
  const { cardId } = req.params
  const { board } = req
  if (!board.cards.find(ca => ca.id === Number(cardId))) {
    return next({ status: 404, message: 'Card not found' })
  }
  next()
}

module.exports = {
  validateBoardId,
  validateCardId,
  validateBoardPayload,
  validateCardPayload,
}
