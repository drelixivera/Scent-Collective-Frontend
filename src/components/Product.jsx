import React, { useState } from 'react';  
import { Container, Row, Col, Card, Button, Badge, Form, InputGroup, Nav } from 'react-bootstrap';
import "../Styles/Product.css";
import useFadeIn from '../useFadeIn';
import { productsData } from '../product-data/product';  

const Products = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [maxPrice, setMaxPrice] = useState(15000); 
    const [activeCategory, setActiveCategory] = useState("All"); 

    const fade = useFadeIn();

    
const filteredProducts = productsData.filter(product => {  
    const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price <= maxPrice;
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    
    return matchesName && matchesPrice && matchesCategory; 
});

    const handleOrderClick = (productName) => {
        const orderSection = document.getElementById("order");
        if (orderSection) {
            orderSection.scrollIntoView({ behavior: "smooth" });
        }
    };
  
    return (
        <section className='products py-5 bg-light' id="products" ref={fade.ref}>
            <Container>
                <div className="text-center mb-5">
                    <h2 className="fw-bold display-5 text-uppercase">The Collection</h2>
                    <p className="text-muted">Premium scents curated for the Ogbomoso lifestyle.</p>
                </div>
 
                <div className="bg-white p-4 shadow-sm rounded-4 mb-5 mx-1">
                    <Row className="g-4 align-items-end">
                        <Col lg={4}>
                            <Form.Label className='fw-bold small text-muted text-uppercase'>Search Collection</Form.Label>
                            <InputGroup>
                                <InputGroup.Text className='bg-white border-end-0'>🔍</InputGroup.Text>
                                <Form.Control 
                                    className='border-start-0 shadow-none'
                                    placeholder="Search by name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </InputGroup>
                        </Col>

                        <Col lg={4}>
                            <div className="d-flex justify-content-between">
                                <Form.Label className="fw-bold small text-muted text-uppercase">Price Range</Form.Label>
                                <span className="fw-bold" style={{color: "#b9935a"}}>Under ₦{maxPrice.toLocaleString()}</span>
                            </div>
                            <Form.Range
                                min="1000"
                                max="15000"
                                step="500"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                            />
                        </Col>

                        <Col lg={4}>
                            <Form.Label className='fw-bold small text-muted text-uppercase d-block'>Categories</Form.Label>
                            <Nav variant="pills" activeKey={activeCategory} onSelect={(k) => setActiveCategory(k)}>
                                {["All", "Fresh", "Woody", "Floral", "Luxury"].map(cat => (
                                    <Nav.Item key={cat}>
                                        <Nav.Link eventKey={cat} className="py-1 px-3 small border me-1 mb-1">
                                            {cat}
                                        </Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        </Col>
                    </Row>
                </div>
 
                <Row className="g-4">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Col xs={12} md={6} lg={3} key={product._id}>
                                <Card className="h-100 border-0 shadow-sm product-card">
                                    <div className="position-relative overflow-hidden">
                                        <Badge bg="dark" className="position-absolute top-0 start-0 m-3 z-index-1 text-uppercase">
                                            {product.category || "New"}
                                        </Badge>
                                        <Card.Img 
                                            variant="top" 
                                            src={product.image} 
                                            className="card-img-top-custom"
                                            onError={(e) => { e.target.src = 'https://placehold.co/400?text=Scent+Coming+Soon' }}
                                        />
                                    </div>
                                    <Card.Body className="d-flex flex-column text-center">
                                        <Card.Title className="fw-bold">{product.name}</Card.Title>
                                        <Card.Text className="text-muted small flex-grow-1">
                                            {product.description}
                                        </Card.Text>
                                        <div className="mt-3">
                                            <h4 className="fw-bold mb-3" style={{ color: '#b9935a' }}>₦{product.price.toLocaleString()}</h4>
                                            <Button 
                                                onClick={() => handleOrderClick(product.name)}
                                                className="w-100 border-0 py-2 fw-bold order-btn"
                                            >
                                                ORDER NOW
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col xs={12} className="text-center py-5">
                            <h3 className="text-muted">Oops! No scents found.</h3>
                            <Button variant="link" onClick={() => {setSearchTerm(""); setMaxPrice(15000); setActiveCategory("All")}}>
                                Reset all filters
                            </Button>
                        </Col>
                    )}
                </Row>
            </Container>
        </section>
    );
};

export default Products;
