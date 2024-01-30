import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserInterface from './pages/UserInterface'
import AudioPlayer from './pages/AudioPlayer'
import PrivateRoutesUser from './Routes/PrivateRoutesUser'
import PrivateRoutesAdmin from './Routes/PrivateRoutesAdmin'
import LoginPage from './pages/LoginPage'
import CrudSongs from './pages/CrudSongs'
import CrudUsers from './pages/CrudUsers'
import NavMenu from './components/navMenu/NavMenu'



function App() {
  const [isLogged, setIsLogged] = useState(()=>{
    return !!localStorage.getItem('token') || false
  })

  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <>
      <NavMenu isLogged={isLogged} setIsLogged={setIsLogged} />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/login' element={<LoginPage setIsLogged={setIsLogged}/>} />
        <Route path="/audioPlayer/:id" element={<UserInterface />} />
        {/* <Route path="/audioplayer" element={<AudioPlayer />} /> */}
        <Route path='/songs' element={<CrudSongs />} />
        <Route path='/users' element={<CrudUsers />} />
      </Routes>
    </>
  )
}

export default App
