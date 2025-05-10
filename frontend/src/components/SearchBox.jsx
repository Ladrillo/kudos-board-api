import { useState } from "react"

export default function SearchBox({ search, setSearch }) {
  const [value, setValue] = useState(search)
  const onChange = (evt) => {
    const { value } = evt.target
    setValue(value)
  }
  const onSubmit = (evt) => {
    evt.preventDefault()
    setSearch(value)
  }
  const onClear = (evt) => {
    evt.preventDefault()
    setSearch("")
    setValue("")
  }
  return (
    <div className="search-box">
      <form onSubmit={onSubmit} role="search">
        <label htmlFor="boardSearch" className="visually-hidden">
          Search for a board
        </label>
        <input
          id="boardSearch"
          type="text"
          value={value}
          placeholder="Search"
          onChange={onChange}
        />
        <button type="submit" aria-label="Submit board search input field">
          Search
        </button>
        <button onClick={onClear} aria-label="Clear board search">
          Clear
        </button>
      </form>
    </div>
  )
}
