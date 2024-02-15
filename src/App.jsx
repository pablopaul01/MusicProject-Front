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
import ForgotPass from './pages/ForgotPass'
import ResetPass from './pages/ResetPass'



function App() {
  const [isLogged, setIsLogged] = useState(()=>{
    return !!localStorage.getItem('token') || false
  })

  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <>
      <NavMenu isLogged={isLogged} setIsLogged={setIsLogged} />
      <Routes>
        {/* <Route path="/" element={<Home/>} /> */}
        <Route path='/' element={<LoginPage setIsLogged={setIsLogged}/>} />
        <Route path="/forgot-pass" element={<ForgotPass />} />
        <Route path="/reset_password/:id/:token" element={<ResetPass />}></Route>
        
      <Route element={<PrivateRoutesUser />}>
        <Route path="/audioPlayer/:id" element={<UserInterface />} />
      </Route>
      <Route element={<PrivateRoutesAdmin />}>
        <Route path='/songs' element={<CrudSongs />} />
        <Route path='/users' element={<CrudUsers />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
