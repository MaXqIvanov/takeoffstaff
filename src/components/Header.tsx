import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
  const nav = useNavigate()
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand onClick={()=> nav('/')}>Web Liter</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">

        </Nav>
        <Nav>
          <Nav.Link onClick={()=> nav('/')}>Контакты</Nav.Link>
          <Nav.Link onClick={()=> nav('/auth')}>Вход</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
