import { useContext } from 'react'
import { BoardsContext } from '../contexts/boardsApi'
import BoardCard from './BoardCard'
import { Link } from 'react-router'

function Home() {
  const { boards } = useContext(BoardsContext)
  return (
    <div>
      <h1>Boards</h1>
      <div>
        {
          boards?.map(brd => {
            return (
              <Link key={brd.id} to={`${brd.id}`}>
                <BoardCard board={brd} />
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
