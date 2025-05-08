import React, { useState, useEffect, createContext } from 'react'

export const BoardsContext = createContext()

export default function BoardsProvider(props) {
  const [boards, setBoards] = useState(null)

  useEffect(() => {
    async function getBoards() {
      const res = await fetch(`/api/boards`)
      const json = await res.json()
      setBoards(json)
    }
    getBoards()
  }, [])

  return (
    <BoardsContext.Provider value={{ boards }}>
      {props.children}
    </BoardsContext.Provider>
  )
}
