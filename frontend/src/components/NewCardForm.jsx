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
  }
  return (
    <div>
      <div>
        <button onClick={() => setModal(false)}>Close</button>
      </div>
      <h2>Create New Card</h2>
      <form onSubmit={onSubmit}>
        <div className="input-group">
          <label>
            Title
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={onChange}
              placeholder="Enter a title"
            />
          </label>

          <label>
            Owner
            <input
              type="text"
              name="owner"
              value={values.owner}
              onChange={onChange}
              placeholder="Enter owner's name"
            />
          </label>

          <label>
            Description
            <input
              type="text"
              name="description"
              value={values.description}
              onChange={onChange}
              placeholder="Enter a description"
            />
          </label>

          <label>
            Search GIF
            <input
              type="text"
              name="search"
              value={values.search}
              onChange={onChange}
              placeholder="Search for a GIF"
            />
          </label>
        </div>

        <button onClick={onGetGifs}>Search</button>
        <div class="gifs">
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
