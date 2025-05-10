import './reset.css'
import './styles.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import Home from './components/Home'
import BoardDetail from './components/BoardDetail'
import BoardsProvider from './contexts/boardsApi'
import GifsProvider from './contexts/gifsApi'
import BoardFilteringProvider from './contexts/boardFiltering'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <BoardFilteringProvider>
      <BoardsProvider>
        <GifsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path=":id" element={<BoardDetail />} />
          </Routes>
          <footer>
            <p>About us: We are Kudos Board!</p>
            <p>Contact us: <a href="https://www.codepath.org/">CodePath.org</a></p>
            <p>© {new Date().getFullYear()} Kudos Board</p>
          </footer>
        </GifsProvider>
      </BoardsProvider>
    </BoardFilteringProvider>
  </BrowserRouter>
)
