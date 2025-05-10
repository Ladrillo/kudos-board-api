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
      const json = await res.json()
      if (!res.ok) throw new Error(`${res.status} Request was not OK`)
      setBoards(boards => {
        return [...boards, json]
      })
    } catch (e) {
      console.warn('postBoard operation failed')
      throw e
    }
  }

  async function deleteBoard(id) {
    try {
      const res = await fetch(`/api/boards/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error(`${res.status} Request was not OK`)
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
      if (!res.ok) throw new Error(`${res.status} Request was not OK`)
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
      if (!res.ok) throw new Error(`${res.status} Request was not OK`)
      setBoards(boards => {
        const boardOfInterest = boards.find(b => b.id == boardId)
        return boards.map(b => {
          if (b != boardOfInterest) return b
          return {
            ...boardOfInterest,
            cards: boardOfInterest.cards.map(c => {
              if (c.id != cardId) return c
              return { ...c, votes: c.votes + 1 }
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

  return (
    <BoardsContext.Provider value={{ boards, deleteBoard, postBoard, deleteCard, upvoteCard }}>
      {props.children}
    </BoardsContext.Provider>
  )
}
