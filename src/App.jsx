import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import UploadSong from './pages/UploadSong'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/upload" element={<UploadSong />} />
      </Routes>
    </>
  )
}

export default App
