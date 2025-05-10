import { useState, createContext } from 'react'

export const BoardFilteringContext = createContext()

export default function BoardFilteringProvider(props) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

  return (
    <BoardFilteringContext.Provider value={{ search, setSearch, filter, setFilter }}>
      {props.children}
    </BoardFilteringContext.Provider>
  )
}
