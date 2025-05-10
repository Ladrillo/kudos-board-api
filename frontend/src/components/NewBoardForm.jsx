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
        <div>
          <button onClick={() => setModal(false)}>Close</button>
        </div>
        <h2>Create New Board</h2>
        <form onSubmit={onSubmit}>
          <input onChange={onChange} value={values.title} name="title" />Title
          <select onChange={onChange} value={values.category} name="category">
            <option value="">--- Select a category ---</option>
            <option value="celebration">Celebration</option>
            <option value="inspiration">Inspiration</option>
            <option value="thankyou">Thank You</option>
          </select>Category
          <input onChange={onChange} value={values.owner} name="owner" />Owner
          <input type="submit" />
        </form>
      </div>
    </div>
  )
}

export default NewBoardForm
