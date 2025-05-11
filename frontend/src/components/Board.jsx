import { Link } from 'react-router'

const categories = {
  inspiration: 'Inspiration',
  thankyou: 'Thank You',
  celebration: 'Celebration',
}

function BoardCard({ board, deleteBoard }) {
  return (
    <div className="board">
      <div><img src={`https://picsum.photos/seed/${board.id}/200/200`} alt="Seeded Random Image"></img></div>
      <div className='board-info'>
        <h3>{board.title}</h3>
        <div className='category'>{categories[board.category]}</div>
        <div className='btn-group'>
          <Link className='board-link' to={`${board.id}`}>View</Link>
          <button className='delete' onClick={() => deleteBoard(board.id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default BoardCard
