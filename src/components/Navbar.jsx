import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingBag } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Styles/Navbar.css";

const ScentNavbar = () => {

   
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
   
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" fixed="top" className="py-3">
      <Container className="d-flex justify-content-between align-items-center">
       
        <Navbar.Brand 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          style={{ cursor: 'pointer', fontSize: '1.0rem', fontWeight: 'bold' }}
        >
          <FaShoppingBag className="me-2" /> Scent Collective
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto text-center">
            <Nav.Link onClick={() => scrollToSection("products")} className="mx-2">
              Products
            </Nav.Link>
            <Nav.Link onClick={() => scrollToSection("why")} className="mx-2">
              Why Choose Us
            </Nav.Link>
            <Nav.Link onClick={() => scrollToSection("order")} className="mx-2">
              Order
            </Nav.Link>
            <Nav.Link onClick={() => scrollToSection("footer")} className="mx-2">
              Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="mx-2 text-warning">
              Vendor Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ScentNavbar;