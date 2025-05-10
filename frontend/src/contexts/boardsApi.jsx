import React, { useState, useEffect, createContext } from 'react'

export const BoardsContext = createContext()

export default function BoardsProvider(props) {
  const [boards, setBoards] = useState(null)

  async function postBoard({ title, owner, category }) {
    try {
      const res = await fetch('/api/boards', {
        method: 'POST',
        body: JSON.stringify({ title, owner, category }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`${res.status} ${res.statusText}: ${errorText}`)
      }
      const newBoard = await res.json()
      setBoards(boards => {
        return [...boards, newBoard]
      })
    } catch (e) {
      console.warn('postBoard operation failed')
      throw e
    }
  }

  async function postCard(boardId, { title, owner, description, gif }) {
    try {
      const res = await fetch(`/api/boards/${boardId}/cards`, {
        method: 'POST',
        body: JSON.stringify({ title, owner, description, gif }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`${res.status} ${res.statusText}: ${errorText}`)
      }
      const newCard = await res.json()
      setBoards(boards => {
        return boards.map(b => {
          if (b.id != boardId) return b
          if (!b.cards) return { ...b, cards: [newCard] }
          return { ...b, cards: [...b.cards, newCard] }
        })
      })
    } catch (e) {
      console.warn('postCard operation failed')
      throw e
    }
  }

  async function deleteBoard(id) {
    try {
      const res = await fetch(`/api/boards/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`${res.status} ${res.statusText}: ${errorText}`)
      }
      setBoards(boards => {
        return boards.filter(b => b.id != id)
      })
    } catch (e) {
      console.warn('deleteBoard operation failed')
      throw e
    }
  }

  async function deleteCard(boardId, cardId) {
    try {
      const res = await fetch(`/api/boards/${boardId}/cards/${cardId}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`${res.status} ${res.statusText}: ${errorText}`)
      }
      setBoards(boards => {
        const boardOfInterest = boards.find(b => b.id == boardId)
        return boards.map(b => {
          if (b.id != boardId) return b
          return {
            ...boardOfInterest,
            cards: boardOfInterest.cards.filter(c => c.id != cardId)
          }
        })
      })
    } catch (e) {
      console.warn('deleteCard operation failed')
      throw e
    }
  }

  async function upvoteCard(boardId, cardId) {
    try {
      const res = await fetch(`/api/boards/${boardId}/cards/${cardId}`, {
        method: 'PATCH',
      })
      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`${res.status} ${res.statusText}: ${errorText}`)
      }
      const upvoted = await res.json()
      setBoards(boards => {
        const boardOfInterest = boards.find(b => b.id == boardId)
        return boards.map(b => {
          if (b != boardOfInterest) return b
          return {
            ...boardOfInterest,
            cards: boardOfInterest.cards.map(c => {
              if (c.id != cardId) return c
              return upvoted
            })
          }
        })
      })
    } catch (e) {
      console.warn('upvoteCard operation failed')
      throw e
    }
  }

  useEffect(() => {
    async function getBoards() {
      const res = await fetch(`/api/boards`)
      const json = await res.json()
      setBoards(json)
    }
    getBoards()
  }, [])

  const api = {
    boards, deleteBoard, postBoard, deleteCard, upvoteCard, postCard,
  }

  return (
    <BoardsContext.Provider value={api}>
      {props.children}
    </BoardsContext.Provider>
  )
}
