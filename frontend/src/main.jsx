import './reset.css'
import './styles.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import Home from './components/Home'
import BoardsProvider from './contexts/boardsApi'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <BoardsProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BoardsProvider>
  </BrowserRouter>
)
