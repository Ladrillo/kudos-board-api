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
      console.warn('NewBoardForm not wiping form as something went wrong')
    }
  }
  return (
    <div>
      <div>
        <button onClick={() => setModal(false)}>Close</button>
      </div>
      <h2>Create New Board</h2>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={values.title} name="title" />Title
        <input onChange={onChange} value={values.category} name="category" />Category
        <input onChange={onChange} value={values.owner} name="owner" />Owner
        <input type="submit" />
      </form>
    </div>
  )
}

export default NewBoardForm
