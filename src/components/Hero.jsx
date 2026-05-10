import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import '../Styles/Hero.css';
import perfumeBg from '../assets/landing-background.png';
import useFadeIn from '../useFadeIn';

const Hero = () => {
    const fade = useFadeIn();
    const scrollToProducts = () => {
        const section = document.getElementById("products");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section 
            className={`hero d-flex align-items-center justify-content-center ${fade.className}`} 
            style={{ 
                backgroundImage: `url(${perfumeBg})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                minHeight: '90vh'
            }}
        >
            
            <div className="hero-badge d-none d-md-block">
                🔥 15% Student Discount Active
            </div>

            <Container className="text-center">
                <div className="hero-overlay mx-auto p-4 p-md-5 shadow-lg">
                    <h1 className="fw-bold text-uppercase display-4 mb-3">Scent Collective</h1>
                    <p className="lead mb-4"><i>Premium fragrances, delivered to your hostel doorstep in Ogbomoso.</i></p>
                    
                    <Button 
                        size="lg" 
                        onClick={scrollToProducts}
                        className="mb-5 px-5 py-3 shadow"
                        style={{ backgroundColor: '#b9935a', border: 'none', borderRadius: '50px', fontWeight: 'bold' }}
                    >
                        SHOP THE COLLECTION
                    </Button>

                    
                    <Row className="mt-4 g-3 border-top pt-4 text-white">
                        <Col xs={6} md={4}>
                            <div style={{ fontSize: '0.75rem', opacity: 0.8, letterSpacing: '1px' }}>⚡ DELIVERY</div>
                            <div className="fw-bold" style={{ fontSize: '0.9rem' }}>24h on Campus</div>
                        </Col>

                        <Col xs={6} md={4}>
                            <div style={{ fontSize: '0.75rem', opacity: 0.8, letterSpacing: '1px' }}>💎 QUALITY</div>
                            <div className="fw-bold" style={{ fontSize: '0.9rem' }}>100% Original</div>
                        </Col>
                      
                        <Col xs={12} md={4} className="d-none d-md-block border-start border-secondary">
                            <div style={{ fontSize: '0.75rem', opacity: 0.8, letterSpacing: '1px' }}>🎓 EXCLUSIVE</div>
                            <div className="fw-bold" style={{ fontSize: '0.9rem' }}>Student Prices</div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    );
};

export default Hero;