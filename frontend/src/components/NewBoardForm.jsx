import { useContext, useState } from 'react'
import { BoardsContext } from '../contexts/boardsApi'

const initialValues = () => ({
  title: '',
  category: '',
  owner: '',
})

function NewBoardForm({ setModal }) {
  const { postBoard } = useContext(BoardsContext)
  const [values, setValues] = useState(initialValues())
  const onChange = e => {
    const { name, value } = e.target
    setValues(val => {
      return { ...val, [name]: value }
    })
  }
  const onSubmit = async e => {
    e.preventDefault()
    try {
      await postBoard(values)
      setModal(false)
    } catch (e) {
      console.warn(`NewBoardForm not wiping form as something went wrong: ${e.message}`)
    }
  }
  return (
    <div className='modal'>
      <div className='content'>
        <div className='close'>
          <button onClick={() => setModal(false)}>&times;</button>
        </div>
        <form className="create-board" onSubmit={onSubmit}>
          <h2>Create New Board</h2>

          <label htmlFor="title">Title</label>
          <input
            placeholder='Type a title'
            id="title"
            name="title"
            value={values.title}
            onChange={onChange}
          />

          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={values.category}
            onChange={onChange}
          >
            <option value="">--- Select a category ---</option>
            <option value="celebration">Celebration</option>
            <option value="inspiration">Inspiration</option>
            <option value="thankyou">Thank You</option>
          </select>

          <label htmlFor="owner">Owner</label>
          <input
            id="owner"
            name="owner"
            value={values.owner}
            onChange={onChange}
          />

          <input type="submit" disabled={Object.values(values).some(v => !v.trim())} />
        </form>

      </div>
    </div>
  )
}

export default NewBoardForm
