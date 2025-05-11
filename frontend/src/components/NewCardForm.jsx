import { useContext, useState } from 'react'
import { BoardsContext } from '../contexts/boardsApi'
import { GifsContext } from '../contexts/gifsApi'

const initialValues = () => ({
  title: 'the title',
  owner: 'the owner',
  description: 'the desc',
  gif: '',
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
    } catch (e) {
      console.warn(`NewCardForm not wiping form as something went wrong: ${e.message}`)
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
    resetGifs()
  }
  return (
    <div className='modal'>
      <div className='content'>
        <div className='close'>
          <button onClick={() => setModal(false)}>&times;</button>
        </div>
        <form className='create-card' onSubmit={onSubmit}>
          <h2>Create New Card</h2>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={onChange}
            placeholder="Enter a title"
          />

          <label htmlFor="owner">Owner</label>
          <input
            type="text"
            id="owner"
            name="owner"
            value={values.owner}
            onChange={onChange}
            placeholder="Enter owner's name"
          />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={values.description}
            onChange={onChange}
            placeholder="Enter a description"
          />

          <label htmlFor="search">Search GIF</label>
          <input
            type="text"
            id="search"
            name="search"
            value={values.search}
            onChange={onChange}
            placeholder="Search for a GIF"
          />

          <button onClick={onGetGifs}>Search Gif</button>
          <div class="gifs">
            {gifs.length > 0 &&
              gifs.map(url => (
                <div className='giphy' key={url} onClick={onGifSelect(url)}>
                  <img src={url} alt="gif" />
                </div>
              ))
            }
          </div>
          <input onChange={onChange} value={values.gif} name="gif" disabled />
          <input type="submit" />
        </form>
      </div>
    </div>
  )
}

export default NewCardForm
