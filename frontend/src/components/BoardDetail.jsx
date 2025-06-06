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
    <div className="board-detail">
      {modal && <NewCardForm boardId={board.id} setModal={setModal} />}
      <a className='back board-link' href="" onClick={goBack}>◀ Back</a>
      <h2>{board.title}</h2>
      <div>{board.owner}</div>
      <button className='create' onClick={() => setModal(true)}>Create a Card</button>
      <div className='col'>
        <div className='cards'>{
          board.cards?.map(card => {
            return (
              <div className='card' key={card.id}>
                <div className='card-content col'>
                  <div className='card-info col'>
                    <h4>{card.title}</h4>
                    <p className='clamp'>{card.description} {card.owner && <>({card.owner})</>}</p>
                  </div>
                  <div><img src={card.gif} /></div>
                </div>
                <div className="card-footer">
                  <button onClick={() => upvoteCard(board.id, card.id)}>{card.votes} Upvote</button>
                  <button className='delete' onClick={() => deleteCard(board.id, card.id)}>Delete</button>
                </div>
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
