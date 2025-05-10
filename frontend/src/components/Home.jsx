import { useContext, useState } from 'react'
import { BoardsContext } from '../contexts/boardsApi'
import BoardCard from './Board'
import NewBoardForm from './NewBoardForm'
import SearchBox from './SearchBox'

function Home() {
  const [modal, setModal] = useState(false)
  const [search, setSearch] = useState('')
  const { boards, deleteBoard } = useContext(BoardsContext)

  const byTitle = (board) => {
    const searchTerm = search.trim().toLowerCase();
    const actualTitle = board.title.toLowerCase();
    return actualTitle.includes(searchTerm);
  }

  const boardsToDisplay = boards?.filter(byTitle) || []

  return (
    <div>
      <h1>Boards</h1>
      {modal && <NewBoardForm setModal={setModal} />}
      <SearchBox search={search} setSearch={setSearch} />
      <button onClick={() => setModal(true)}>Create New Board</button>
      <div className='boards'>
        {
          boardsToDisplay.map(brd => {
            return (
              <BoardCard key={brd.id} board={brd} deleteBoard={deleteBoard} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
