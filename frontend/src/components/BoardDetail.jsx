import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { BoardsContext } from '../contexts/boardsApi'
import NewCardForm from './NewCardForm'

function BoardDetail() {
  const [modal, setModal] = useState(false)
  const { boards, deleteCard, upvoteCard } = useContext(BoardsContext)
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
      {modal && <NewCardForm boardId={board.id} setModal={setModal} />}
      <button onClick={() => setModal(true)}>Create a Card</button>
      <div>
        <div>{board.title}</div>  
        <div>{board.owner}</div>
        <div className='cards'>{
          board.cards?.map(card => {
            return (
              <div className='card' key={card.id}>
                <div>{card.title}</div>
                {card.owner && <div>{card.owner}</div>} 
                <div>{card.votes}</div>
                <div><img src={card.gif} /></div>
                <button onClick={() => upvoteCard(board.id, card.id)}>Upvote</button>
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
