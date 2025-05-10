import { Link } from 'react-router'

function BoardCard({ board, deleteBoard }) {
  return (
    <div className="card">
      <div><img src={`https://picsum.photos/seed/${board.id}/200/300`} alt="Seeded Random Image"></img></div>
      <div>{board.title}</div>
      <div>{board.category}</div>
      <Link to={`${board.id}`}>View Board</Link>
      <button onClick={() => deleteBoard(board.id)}>Delete board</button>
    </div>
  )
}

export default BoardCard
