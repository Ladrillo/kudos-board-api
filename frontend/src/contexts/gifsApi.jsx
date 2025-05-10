import { useState, createContext } from 'react'

export const GifsContext = createContext()

const apiKey = import.meta.env.VITE_GIPHY_API_KEY

export default function GifsProvider(props) {
  const [gifs, setGifs] = useState([])

  function resetGifs() {
    setGifs([])
  }
  async function getGifs(search) {
    const params = new URLSearchParams({
      api_key: apiKey,
      limit: 6,
      q: search,
    })
    const url = new URL('https://api.giphy.com/v1/gifs/search')
    url.search = params.toString()
    try {
      const res = await fetch(url)
      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`${res.status} ${res.statusText}: ${errorText}`)
      }
      const parsed = await res.json()
      const urls = parsed.data.map(i => i.images.original.url)
      setGifs(urls)
    } catch (e) {
      console.warn('getGifs operation failed')
      throw e
    }
  }

  return (
    <GifsContext.Provider value={{ gifs, getGifs, resetGifs }}>
      {props.children}
    </GifsContext.Provider>
  )
}
