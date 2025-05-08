function BoardCard({ board }) {
  return (
    <div className="card">
      <div>{board.title}</div>
      <div>{board.owner}</div>
    </div>
  )
}

export default BoardCard
