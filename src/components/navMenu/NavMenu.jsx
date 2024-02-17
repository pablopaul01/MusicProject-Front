import React, { useContext, useEffect } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import "./navMenu.css"


const NavMenu = () => {
  const {state,dispatch} = useContext(GlobalContext)
  const navigate = useNavigate();
  let token = ""

useEffect(() => {
  if (localStorage.getItem("localIsLogged")) {
    dispatch({type: 'SET_IS_LOGGED', payload: true})
  }
},[])


  const logout = () => {
    Swal.fire({
      title: 'Cerrar Sesión',
      text: "Está seguro que desea cerrar sesión",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar sesión'
  }).then(async (result) => {
      if (result.isConfirmed) {
            localStorage.removeItem("token")
            localStorage.removeItem("localIsLogged")
            dispatch({type: 'SET_IS_LOGGED', payload: false})
            dispatch({type: 'SET_USER', payload: {}})
            dispatch({type: 'SET_SONGS', payload: []})
            dispatch({type: 'SET_CURRENT_SONG', payload: {}})
            dispatch({type: 'SET_CURRENT_SONG_INDEX', payload: 0})
            dispatch({type: 'SET_CURRENT_TIME', payload: "00:00"})
            dispatch({type: 'SET_IS_PLAYING', payload: false})
            dispatch({type: 'SET_PORCENTAJE', payload: 0})
            navigate("/")
      }
    })
  }

  if (localStorage.getItem("token")) {
   token = localStorage.getItem("token");
  }

  const goPlayer = () => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    navigate(`/audioPlayer/${decoded.sub}`);
  }

  return (
    <Navbar expand="lg" className="navMenu d-flex justify-content-between ps-5 pe-5">

      <Navbar.Brand >
        <Link to={"/"}><img src="https://res.cloudinary.com/dtkrptodh/image/upload/v1707952332/media/1-S_ukyccj.png" alt="logo" style={{width:"7rem"}}/></Link>
      </Navbar.Brand>
      <div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          { token ? (
            jwtDecode(token).role === "admin" &&
            (<NavDropdown title="Administrar" id="basic-nav-dropdown">
            <NavDropdown.Item className='dropDown'>
              <Link to={"users"} className='itemDropdown'>Usuarios</Link> 
            </NavDropdown.Item>
            <NavDropdown.Item className='dropDown'>
              <Link to="/songs" className='itemDropdown'>Canciones</Link> 
            </NavDropdown.Item>
            <NavDropdown.Item className='dropDown'>
                <Link to="/categories" className='itemDropdown'>Categorias </Link>
            </NavDropdown.Item>
          </NavDropdown>) 
          ) : (<></>)
          }
          {
            state.isLogged && jwtDecode(token).role === "user"? (
              <Nav.Link onClick={goPlayer} className='itemMenu'>Reproductor</Nav.Link>
            ) : (<></>)
          }
          {
            state.isLogged ? (
              <>
                <Nav.Link onClick={logout} className='itemMenu'>Cerrar sesión</Nav.Link>
              </>
            ) 
            : 
            (
              <Nav.Link className='itemMenu'><Link to={"/login"} className='itemMenu'>Iniciar sesión</Link></Nav.Link>
            )
          }
          
        </Nav>
      </Navbar.Collapse>
      </div>
  </Navbar>
  )
}

export default NavMenu