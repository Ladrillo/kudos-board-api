import { useContext, useState } from 'react'
import { BoardsContext } from '../contexts/boardsApi'
import BoardCard from './Board'
import NewBoardForm from './NewBoardForm'

function Home() {
  const [modal, setModal] = useState(false)
  const { boards, deleteBoard } = useContext(BoardsContext)
  return (
    <div>
      <h1>Boards</h1>
      {modal && <NewBoardForm setModal={setModal} />}
      <button onClick={() => setModal(true)}>Create New Board</button>
      <div className='boards'>
        {
          boards?.map(brd => {
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
