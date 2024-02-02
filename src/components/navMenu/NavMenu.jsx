import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';


const NavMenu = () => {
  const {state,dispatch} = useContext(GlobalContext)
  const navigate = useNavigate();
  let token = ""

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

  return (
    <Navbar expand="lg" className="bg-body-tertiary d-flex justify-content-between ps-5 pe-5"  data-bs-theme="dark">

      <Navbar.Brand href="#home"><img src="https://res.cloudinary.com/dtkrptodh/image/upload/v1706725888/Medias/logo-h.png" alt="logo" style={{width:"7rem"}}/></Navbar.Brand>
      <div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {
            state.isLogged &&

            <Nav.Link href="#home">Reproductor</Nav.Link>
          }
          { token ? (
            jwtDecode(token).role === "admin" &&
            (<NavDropdown title="Administrar" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">
                <Link to="/songs">Canciones </Link>
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              <Link to={"users"}>Usuarios</Link> 
            </NavDropdown.Item>
          </NavDropdown>) 
          ) : (<></>)
          }
          
          {console.log(state.isLogged)}
          {
            state.isLogged ? (
              <Nav.Link onClick={logout}>Cerrar sesión</Nav.Link>
            ) 
            : 
            (
              <Nav.Link href="#link">Iniciar sesión</Nav.Link>
            )
          }
          
        </Nav>
      </Navbar.Collapse>
      </div>
  </Navbar>
  )
}

export default NavMenu