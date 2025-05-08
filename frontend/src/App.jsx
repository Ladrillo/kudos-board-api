import { useEffect, useState } from 'react'
import './App.css'

console.log(import.meta.env)
const IS_PROD = import.meta.env.MODE === "production"
const baseUrl = IS_PROD ? '/' : 'http://localhost:3000/'

function App() {
  const [apiData, setApiData] = useState(null)

  useEffect(() => {
    async function getBoards() {
      const res = await fetch(`${baseUrl}api/boards`)
      const json = await res.json()
      setApiData(json)
    }
    getBoards()
  }, [])

  console.log(apiData)
  return (
    <div>Hello, there</div>
  )
}

export default App
