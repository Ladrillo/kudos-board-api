import { useContext } from 'react'
import { BoardsContext } from '../contexts/boardsApi'
import BoardCard from './BoardCard'

function Home() {
  const { boards } = useContext(BoardsContext)

  console.log(boards)
  return (
    <div>
      <h1>Boards</h1>

      <div>
        {
          boards?.map(brd => {
            return (
              <BoardCard key={brd.id} board={brd} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
