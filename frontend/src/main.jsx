import './reset.css'
import './styles.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import Home from './components/Home'
import BoardDetail from './components/BoardDetail'
import BoardsProvider from './contexts/boardsApi'
import GifsProvider from './contexts/gifsApi'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <BoardsProvider>
      <GifsProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path=":id" element={<BoardDetail />} />
        </Routes>
      </GifsProvider>
    </BoardsProvider>
  </BrowserRouter>
)
