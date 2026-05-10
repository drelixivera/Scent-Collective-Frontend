import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Modal, FloatingLabel } from "react-bootstrap";
import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";
import '../Styles/OrderForm.css'; 
import useFadeIn from '../useFadeIn';  

const OrderForm = () => {
    const fade = useFadeIn();
    const [dbProducts, setDbProducts] = useState([]);
    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState(""); 
    const [hostel, setHostel] = useState(""); 
    const [totalPrice, setTotalPrice] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setDbProducts(res.data);
            } catch (err) {
                console.error("Error fetching scents for order form:", err);
            }
        };
        fetchProducts();
    }, []);
 
    useEffect(() => {
        const selectedObj = dbProducts.find(p => p.name === product);
        
        if (selectedObj) {
            setTotalPrice(selectedObj.price * quantity);
        } else {
            setTotalPrice(0);
        }
    }, [product, quantity, dbProducts]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!product || !name || !phone || !hostel) {
            alert("Please fill in all details for your delivery.");
            return;
        }
        setShowModal(true);
    };

    const confirmAndRedirect = () => { 
        const message = `✨ *New Order from Scent Collective* ✨\n\n` +
                        `*Product:* ${product}\n` +
                        `*Quantity:* ${quantity}\n` +
                        `*Total:* ₦${totalPrice.toLocaleString()}\n\n` +
                        `*Customer:* ${name}\n` +
                        `*Phone:* ${phone}\n` +
                        `*Delivery:* ${hostel}`;
 
        const whatsappURL = `https://wa.me/2349138575377?text=${encodeURIComponent(message)}`;
        
        setShowModal(false);
        window.open(whatsappURL, "_blank");
    };

    return (
        <section className={`order py-5 ${fade.className}`} id="order" ref={fade.ref}>
            <Container>
                <div className="text-center mb-5">
                    <h2 className="fw-bold display-5 text-uppercase">Secure Your Scent</h2>
                    <p className="text-muted">Premium fragrances delivered to your hostel doorstep.</p>
                </div>
                
                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={8}>
                        <div className="order-glass-card p-4 p-md-5 shadow-lg">
                            <Form onSubmit={handleSubmit}>
                                <Row className="g-3">
                                    <Col md={8}>
                                        <FloatingLabel label="Select Fragrance" className="mb-3">
                                            <Form.Select 
                                                value={product} 
                                                onChange={(e) => setProduct(e.target.value)} 
                                                required
                                            >
                                                <option value="">Choose your vibe...</option>
                                                {/* DYNAMIC LIST MAPPED FROM DATABASE */}
                                                {dbProducts.map(item => (
                                                    <option key={item._id} value={item.name}>
                                                        {item.name} (₦{item.price.toLocaleString()})
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                    
                                    <Col md={4}>
                                        <FloatingLabel label="Quantity" className="mb-3">
                                            <Form.Control 
                                                type="number" 
                                                min="1" 
                                                value={quantity} 
                                                onChange={(e) => setQuantity(e.target.value)} 
                                                required 
                                            />
                                        </FloatingLabel>
                                    </Col>

                                    <Col md={6}>
                                        <FloatingLabel label="Your Full Name" className="mb-3">
                                            <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                                        </FloatingLabel>
                                    </Col>

                                    <Col md={6}>
                                        <FloatingLabel label="Phone Number" className="mb-3">
                                            <Form.Control type="tel" placeholder="080..." value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                        </FloatingLabel>
                                    </Col>

                                    <Col xs={12}>
                                        <FloatingLabel label="Hostel / Delivery Address (Ogbomoso)" className="mb-4">
                                            <Form.Control as="textarea" placeholder="Address" style={{ height: '100px' }} value={hostel} onChange={(e) => setHostel(e.target.value)} required />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {totalPrice > 0 && (
                                    <div className="total-display text-center mb-4 p-3 rounded shadow-sm" style={{background: 'rgba(185, 147, 90, 0.1)'}}>
                                        <span className="text-muted small text-uppercase">Estimated Total:</span>
                                        <h3 className="fw-bold mb-0" style={{ color: '#b9935a' }}>₦{totalPrice.toLocaleString()}</h3>
                                    </div>
                                )}

                                <Button type="submit" className="w-100 py-3 checkout-btn shadow border-0">
                                    <FaWhatsapp className="me-2" /> ORDER VIA WHATSAPP
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
 
            <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static">
                <Modal.Body className="text-center p-5">
                    <FaCheckCircle size={80} color="#b9935a" className="mb-4 pulse-icon" />
                    <h2 className="fw-bold">Ready to Roll!</h2>
                    <p className="text-muted mb-4">We've prepared your order details. Simply click below to send them to us on WhatsApp.</p>
                    <Button 
                        onClick={confirmAndRedirect} 
                        style={{ backgroundColor: '#111', border: 'none', borderRadius: '30px' }}
                        className="px-5 py-3 fw-bold shadow"
                    >
                        CONFIRM & SEND
                    </Button>
                </Modal.Body>
            </Modal>
        </section>
    );
};

export default OrderForm;