import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [apiData, setApiData] = useState(null)

  useEffect(() => {
    async function getBoards() {
      const res = await fetch(`/api/boards`)
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
