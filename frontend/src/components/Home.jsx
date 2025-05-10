import { useContext, useState } from 'react'
import { BoardsContext } from '../contexts/boardsApi'
import { BoardFilteringContext } from '../contexts/boardFiltering'
import Board from './Board'
import NewBoardForm from './NewBoardForm'
import SearchBox from './SearchBox'

function Home() {
  const [modal, setModal] = useState(false)
  const { boards, deleteBoard } = useContext(BoardsContext)
  const { search, setSearch, filter, setFilter } = useContext(BoardFilteringContext)

  const onFilter = evt => {
    setFilter(evt.target.name)
  }

  function getSixMostRecent(boards) {
    return [...boards]
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
        <button className={filter === "" ? 'active' : ""} onClick={onFilter} name="">All</button>
        <button className={filter === "recent" ? 'active' : ""} onClick={onFilter} name="recent">Recent</button>
        <button className={filter === "celebration" ? 'active' : ""} onClick={onFilter} name="celebration">Celebration</button>
        <button className={filter === "thankyou" ? 'active' : ""} onClick={onFilter} name="thankyou">Thank You</button>
        <button className={filter === "inspiration" ? 'active' : ""} onClick={onFilter} name="inspiration">Inspiration</button>
      </div>
      <button onClick={() => setModal(true)}>Create New Board</button>
      <div className='boards'>
        {
          boardsToDisplay.length
            ? boardsToDisplay.map(brd => {
              return (
                <Board key={brd.id} board={brd} deleteBoard={deleteBoard} />
              )
            })
            : <p>There are no boards to display.</p>
        }
      </div>
    </div>
  )
}

export default Home
