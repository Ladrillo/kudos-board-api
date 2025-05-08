import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

console.log(import.meta.env)
const IS_PROD = import.meta.env.MODE === "production"
const baseUrl = IS_PROD ? '/' : 'http://localhost:3000/'

function App() {
  const [count, setCount] = useState(0)
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
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
