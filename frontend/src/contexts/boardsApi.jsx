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
      const json = await res.json()
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

  return (
    <BoardsContext.Provider value={{ boards, deleteBoard, postBoard, deleteCard, upvoteCard }}>
      {props.children}
    </BoardsContext.Provider>
  )
}
