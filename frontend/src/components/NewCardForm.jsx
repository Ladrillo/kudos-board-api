import { useContext, useState } from 'react'
import { BoardsContext } from '../contexts/boardsApi'

const initialValues = () => ({
  title: '',
  owner: '',
  description: '',
  gif: 'http://foo.com',
})

function NewCardForm({ boardId, setModal }) {
  const { postCard } = useContext(BoardsContext)
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
      await postCard(boardId, values)
      setModal(false)
    } catch (e) {
      console.warn('NewCardForm not wiping form as something went wrong')
    }
  }
  return (
    <div>
      <div>
        <button onClick={() => setModal(false)}>Close</button>
      </div>
      <h2>Create New Card</h2>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={values.title} name="title" />Title
        <input onChange={onChange} value={values.owner} name="owner" />Owner
        <input onChange={onChange} value={values.description} name="description" />Description
        <input onChange={onChange} value={values.gif} name="gif" />Gif
        <input type="submit" />
      </form>
    </div>
  )
}

export default NewCardForm
