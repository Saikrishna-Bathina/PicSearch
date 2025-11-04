import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AppNavbar({ user, onLogout }) {
  return (
    <Navbar expand="lg" style={{ padding: '15px 0', borderBottom: '1px solid #eee' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center" style={{ fontWeight: 'bold' }}>
          <span style={{ fontSize: '20px', color: '#6d28d9', marginRight: '5px' }}>
            <i className="bi bi-search"></i> {/* Placeholder for an actual icon */}
          </span> 
          <span style={{ color: '#333' }}>PicSearch</span>
        </Navbar.Brand>
        
        <Nav className="ms-auto d-flex align-items-center">
          {user ? (
            <>
              <Navbar.Text className="me-3" style={{ color: '#333' }}>
                 {user.name.split(' ')[0]} 
              </Navbar.Text>
              
              <Button 
                onClick={onLogout}
                style={{
                  backgroundColor: '#6d28d9', 
                  borderColor: '#6d28d9',
                  fontWeight: 'bold',
                  padding: '5px 15px'
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Nav.Link as={Link} to="/" style={{ color: '#333' }}>
              Login
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}