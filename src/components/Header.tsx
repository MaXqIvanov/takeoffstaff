import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../store/store'

export const Header = () => {
  const nav = useNavigate()
  const {auth} = useSelector((state:RootState)=> state.auth)
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand style={{cursor: 'pointer'}} onClick={()=> nav('/')}>Web Liter</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">

        </Nav>
        <Nav>
          <Nav.Link onClick={()=> nav('/')}>Контакты</Nav.Link>
          <Nav.Link onClick={()=> nav('/auth')}>{auth ? "Выход" : "Вход"}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
