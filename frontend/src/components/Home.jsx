import { useContext, useState } from 'react'
import { BoardsContext } from '../contexts/boardsApi'
import BoardCard from './Board'
import NewBoardForm from './NewBoardForm'
import SearchBox from './SearchBox'

function Home() {
  const [modal, setModal] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const { boards, deleteBoard } = useContext(BoardsContext)

  const onFilter = evt => {
    setFilter(evt.target.name)
  }

  function getSixMostRecent(items) {
    return [...items]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6)
  }

  const filtered = boards => {
    switch (filter) {
      case "celebration":
      case "thankyou":
      case "inspiration":
        return boards.filter(b => b.category === filter)
      case "recent":
        return getSixMostRecent(boards)
      default:
        return boards
    }
  }

  const searchByTitle = board => {
    const searchTerm = search.trim().toLowerCase()
    const actualTitle = board.title.toLowerCase()
    return actualTitle.includes(searchTerm)
  }

  const boardsToDisplay = filtered(boards?.filter(searchByTitle) || [])

  return (
    <div>
      <h1>Boards</h1>
      {modal && <NewBoardForm setModal={setModal} />}
      <SearchBox search={search} setSearch={setSearch} />
      <div className="btn-group">
        <button onClick={onFilter} name="">All</button>
        <button onClick={onFilter} name="recent">Recent</button>
        <button onClick={onFilter} name="celebration">Celebration</button>
        <button onClick={onFilter} name="thankyou">Thank You</button>
        <button onClick={onFilter} name="inspiration">Inspiration</button>
      </div>
      <button onClick={() => setModal(true)}>Create New Board</button>
      <div className='boards'>
        {
          boardsToDisplay.length
            ? boardsToDisplay.map(brd => {
              return (
                <BoardCard key={brd.id} board={brd} deleteBoard={deleteBoard} />
              )
            })
            : <p>There are no boards to display.</p>
        }
      </div>
    </div>
  )
}

export default Home
