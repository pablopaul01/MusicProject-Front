import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import UploadSong from './pages/UploadSong'
import Home from './pages/Home'
import Player from './pages/Player'
import UserInterface from './pages/UserInterface'
import Login from './components/login/Login'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/upload" element={<UploadSong />} />
        <Route path="/player" element={<Player />} />
        <Route path="/userPage" element={<UserInterface />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
