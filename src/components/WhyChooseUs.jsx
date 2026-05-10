import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaShippingFast, FaGem, FaTags } from "react-icons/fa";
import '../Styles/WhyChooseUs.css';
import useFadeIn from '../useFadeIn';

const WhyChooseUs = () => {
    const fade = useFadeIn();
    
    return (
        <section className={`why py-5 ${fade.className}`} id="why" ref={fade.ref}>
            <Container>
                <h2 className="text-center mb-5">Why Choose Scent Collective?</h2>

                <Row className="text-center">

                    <Col xs={12} md={4} className="mb-4">
                        <div className='why-card p-4 h-100 shadow-sm'>
                            <FaShippingFast className='icon mb-3' style={{ fontSize: '2.5rem', color: '#b9935a' }} />
                            <h3>Fast Campus Delivery</h3>
                            <p>Get your fragrance delivered quickly anywhere on campus.</p>
                        </div>
                    </Col>

                    <Col xs={12} md={4} className="mb-4">
                        <div className='why-card p-4 h-100 shadow-sm'>
                            <FaGem className='icon mb-3' style={{ fontSize: '2.5rem', color: '#b9935a' }} />
                            <h3>Premium Quality</h3>
                            <p>Authentic and long-lasting fragrances you can trust.</p>
                        </div>
                    </Col>
                   
                    <Col xs={12} md={4} className="mb-4">
                        <div className='why-card p-4 h-100 shadow-sm'>
                            <FaTags className='icon mb-3' style = {{ fontSize: '2.5rem', color: '#b9935a' }} />
                            <h3>Student-Friendly Prices</h3>
                            <p>Luxury scents without draining your wallet.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default WhyChooseUs;