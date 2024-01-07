import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import UploadSong from './pages/UploadSong'
import Home from './pages/Home'
import Player from './pages/Player'
import UserInterface from './pages/UserInterface'
import AudioPlayer from './pages/AudioPlayer'
import PrivateRoutesUser from './Routes/PrivateRoutesUser'
import PrivateRoutesAdmin from './Routes/PrivateRoutesAdmin'
import LoginPage from './pages/LoginPage'



function App() {
  const [isLogged, setIsLogged] = useState(()=>{
    return !!localStorage.getItem('token') || false
  })

  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/login' element={<LoginPage setIsLogged={setIsLogged}/>} />
        <Route path="/upload" element={<UploadSong />} />
        <Route path="/player" element={<Player />} />
        <Route path="/userPage" element={<UserInterface />} />
        <Route path="/audioplayer" element={<AudioPlayer />} />
      </Routes>
    </>
  )
}

export default App
