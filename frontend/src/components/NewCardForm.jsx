import { useContext, useState } from 'react'
import { BoardsContext } from '../contexts/boardsApi'
import { GifsContext } from '../contexts/gifsApi'

const initialValues = () => ({
  title: 'the title',
  owner: 'the owner',
  description: 'the desc',
  gif: 'http://foo.com',
  search: 'torero',
})

function NewCardForm({ boardId, setModal }) {
  const { postCard } = useContext(BoardsContext)
  const { gifs, getGifs, resetGifs } = useContext(GifsContext)
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
      resetGifs()
    } catch (e) {
      console.warn('NewCardForm not wiping form as something went wrong')
    }
  }
  const onGetGifs = async e => {
    e.preventDefault()
    try {
      getGifs(values.search)
    } catch (e) {
      console.warn('mm')
      throw e
    }
  }
  const onGifSelect = url => e => {
    e.preventDefault()
    setValues(val => ({ ...val, gif: url }))
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
        <input onChange={onChange} value={values.search} name="search" />Search GIF
        <button onClick={onGetGifs}>Search</button>
        <div>
          {gifs.length &&
            gifs.map(url => (
              <div key={url} onClick={onGifSelect(url)}>
                <img src={url} alt="gif" />
              </div>
            ))
          }
        </div>
        <input onChange={onChange} value={values.gif} name="gif" disabled />Gif
        <input type="submit" />
      </form>
    </div>
  )
}

export default NewCardForm
