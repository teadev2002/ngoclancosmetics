import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <header className="header fixed-top">
      <Navbar expand="lg" className="navbar px-3">
        <Container>
          <Navbar.Brand href="#home" className="brand-text" style={{ fontSize: '26px' }}>
            Ngọc Lan Cosmetics
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className="nav-link">Zalo: 0902715456</Nav.Link>
              <Nav.Link href="#home" className="nav-link">Trang chủ</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;