import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';


const NavMenu = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary d-flex justify-content-between ps-5 pe-5"  data-bs-theme="dark">

      <Navbar.Brand href="#home"><img src="https://res.cloudinary.com/dtkrptodh/image/upload/v1706725888/Medias/logo-h.png" alt="logo" style={{width:"7rem"}}/></Navbar.Brand>
      <div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Reproductor</Nav.Link>
          <NavDropdown title="Administrar" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">
                <Link to="/songs">Canciones </Link>
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              <Link to={"users"}>Usuarios</Link> 
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#link">Iniciar sesión</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </div>
  </Navbar>
  )
}

export default NavMenu