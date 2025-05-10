import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router'
import { BoardsContext } from '../contexts/boardsApi'

function BoardDetail() {
  const { boards, deleteCard } = useContext(BoardsContext)
  const { id } = useParams()
  const board = boards?.find(brd => brd.id == id)
  const navigate = useNavigate()
  const goBack = e => {
    e.preventDefault()
    navigate(-1)
  }

  if (!board) return null

  return (
    <div className="card">
      <a href="" onClick={goBack}>Back</a>
      <h1>Board Detail</h1>
      <div>
        <div>{board.title}</div>
        <div>{board.owner}</div>
        <div>{
          board.cards?.map(card => {
            return (
              <div className='card' key={card.id}>
                <div>{card.title}</div>
                <button>Upvote</button>
                <button onClick={() => deleteCard(board.id, card.id)}>Delete</button>
              </div>
            )
          })
        }
        </div>
      </div>
    </div>
  )
}

export default BoardDetail
