import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import "../Styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer py-5" id="footer">
            <Container>
                <Row>
                    <Col xs={12} md={3} className="mb-4 mb-md-0 text-center text-md-start">
                        <h3 className="fw-bold">Scent Collective</h3>
                        <p className="opacity-75">Premium scents for students who stand out.</p>
                    </Col>
 
                    <Col xs={6} md={3} className="mb-4 mb-md-0">
                        <h4 className="h5 mb-3">Quick Links</h4>
                        <ul className="list-unstyled">
                            <li><a href="#products" className="text-decoration-none text-white-50">Products</a></li>
                            <li><a href="#order" className="text-decoration-none text-white-50">Order</a></li>
                            <li><a href="#why" className="text-decoration-none text-white-50">Why choose Us</a></li>
                        </ul>
                    </Col>
 
                    <Col xs={6} md={3} className="mb-4 mb-md-0">
                        <h4 className="h5 mb-3">Contact</h4>
                        <p className="mb-1 opacity-75"><FaEnvelope className="me-2" /> in@scentcollective</p>
                        <p className="opacity-75"><FaWhatsapp className="me-2" /> +234 800 000 0000</p>
                    </Col>
                    <Col xs={12} md={3} className="text-center text-md-start">
                        <h4 className="h5 mb-3">Follow Us</h4>
                        <div className="d-flex justify-content-center justify-content-md-start gap-3">
                            <a href="#" className="text-white fs-4"><FaInstagram /></a>
                            <a href="#" className="text-white fs-4"><FaWhatsapp /></a>
                        </div>
                    </Col>
                </Row>

                <hr className="my-4 border-secondary" />

                <Row>
                    <Col className="text-center text-white-50 small">
                        <p>© {new Date().getFullYear()} Scent Collective. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;