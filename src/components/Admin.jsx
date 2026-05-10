import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Container, Row, Col, Card, Form, Button, Table, Badge, Nav } from 'react-bootstrap';
import "../Styles/Admin.css"; 

const Admin = () => {
    // ==========================================
    // STATE MANAGEMENT
    // ==========================================

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [isEditing, setIsEditing] = useState(false); 
    const [editId, setEditId] = useState(null); 
    const [activeTab, setActiveTab] = useState('inventory');

    const initialFormState = {
        name: '',
        price: '',
        description: '',
        category: 'Fresh',
        image: '' 
    };
    const [newProduct, setNewProduct] = useState(initialFormState);
 
    const [settings, setSettings] = useState({
        heroTitle: 'The Collection',
        heroSubtitle: 'Premium scents curated for the Ogbomoso lifestyle.',
        contactWhatsapp: '2349138575377'
    });

    // ==========================================
    // DATA FETCHING 
    // ==========================================
    const fetchData = async () => {
        setLoading(true);
        try {
            const prodRes = await axios.get('http://localhost:5000/api/products');
            setProducts(prodRes.data);
 
            try {
                const settRes = await axios.get('http://localhost:5000/api/settings');
                if (settRes.data && settRes.data.length > 0) {
                    setSettings(settRes.data[0]); 
                }
            } catch (settingsErr) {
                console.warn("Settings not found in DB yet. Using defaults.");
            }

        } catch (err) {
            console.error("Critical Error fetching products:", err);
            alert("Database connection failed. Please ensure your backend server is running on port 5000.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // ==========================================
    // PRODUCT LOGIC (INVENTORY)
    // ==========================================
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewProduct({ ...newProduct, image: file });
            setImagePreview(URL.createObjectURL(file)); 
        }
    };

    const handleSubmitProduct = async (e) => {
        e.preventDefault();
        setLoading(true);

        const CLOUD_NAME = "duvhp9u7k"; 
        const UPLOAD_PRESET = "scent_uploads"; 

        try {
            let finalImageUrl = newProduct.image;
 
            if (newProduct.image && typeof newProduct.image === 'object') {
                const data = new FormData();
                data.append("file", newProduct.image);
                data.append("upload_preset", UPLOAD_PRESET);

                const uploadRes = await axios.post(
                    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                    data
                );
                finalImageUrl = uploadRes.data.secure_url;
            }

            const productData = { 
                ...newProduct, 
                image: finalImageUrl, 
                price: Number(newProduct.price) 
            };
            
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/products/${editId}`, productData);
                alert("Scent Updated Successfully! ✨");
            } else {
                await axios.post('http://localhost:5000/api/products', productData);
                alert("Scent Uploaded Successfully! 📸");
            }
            
            handleCancelEdit();
            fetchData(); 
        } catch (err) {
            const errorMsg = err.response?.data?.error?.message || "Check your network or server.";
            alert(`Action failed: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (product) => {
        setIsEditing(true);
        setEditId(product._id);
        setNewProduct({
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image 
        });
        setImagePreview(product.image);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditId(null);
        setNewProduct(initialFormState);
        setImagePreview(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to remove this scent?")) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${id}`);
                setProducts(products.filter(p => p._id !== id));
                alert("Product deleted successfully.");
            } catch (err) {
                console.error("Error deleting product:", err);
                alert("Delete failed.");
            }
        }
    };

    // ==========================================
    // SITE SETTINGS LOGIC
    // ==========================================

    const handleSettingsUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put('http://localhost:5000/api/settings', settings);
            alert("Website Content Updated! Your site now reflects the new changes. ✨");
        } catch (err) {
            console.error("Settings Update Error:", err);
            alert("Failed to update site settings. Check your backend route.");
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // CALCULATIONS & UI HELPERS
    // ==========================================

    const totalProducts = products.length;
    const totalValue = products.reduce((acc, curr) => acc + Number(curr.price || 0), 0);
    const luxuryCount = products.filter(p => p.category === "Luxury").length;

    const handleLogout = () => {
        localStorage.removeItem("vendorToken");
        window.location.href = "/login";
    };

    if (loading && products.length === 0) {
    return <div className="text-center py-5"><h4>Synchronizing with Database...</h4></div>;
}
    // ==========================================
    // RENDER
    // ==========================================

    return (
        <Container className="py-5 admin-container" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            
            <div className="d-flex justify-content-between align-items-center mb-5 p-3 glass-header shadow-sm">
                <div>
                    <h2 className="fw-bold text-uppercase m-0" style={{color: '#b9935a'}}>Vendor Command Center</h2>
                    <p className="text-muted small m-0">Official Management for Scent Collective</p>
                </div>
                <Button variant="danger" className="fw-bold px-4 rounded-pill shadow-sm" onClick={handleLogout}>
                    LOGOUT
                </Button>
            </div>

            <Nav variant="pills" className="mb-5 justify-content-center admin-nav shadow-sm p-2 rounded-pill bg-white">
                <Nav.Item>
                    <Nav.Link 
                        active={activeTab === 'inventory'} 
                        onClick={() => setActiveTab('inventory')}
                        className="rounded-pill px-4 fw-bold"
                    >
                        Inventory Manager
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link 
                        active={activeTab === 'settings'} 
                        onClick={() => setActiveTab('settings')}
                        className="rounded-pill px-4 fw-bold"
                    >
                        Global Site Settings
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            
            {activeTab === 'inventory' && (
                <>
                    <Row className="mb-5 g-4 text-center">
                        <Col md={4}>
                            <Card className="glass-card border-0 shadow-sm p-3 h-100">
                                <Card.Body>
                                    <div className="text-uppercase small fw-bold text-muted mb-2">Collection Size</div>
                                    <h2 className="fw-bold" style={{color: '#b9935a'}}>{totalProducts}</h2>
                                    <small className="text-muted">Total Active Scents</small>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="glass-card border-0 shadow-sm p-3 h-100">
                                <Card.Body>
                                    <div className="text-uppercase small fw-bold text-muted mb-2">Total Worth</div>
                                    <h2 className="fw-bold" style={{color: '#b9935a'}}>₦{totalValue.toLocaleString()}</h2>
                                    <small className="text-muted">Combined Market Value</small>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="glass-card border-0 shadow-sm p-3 h-100">
                                <Card.Body>
                                    <div className="text-uppercase small fw-bold text-muted mb-2">Premium Blends</div>
                                    <h2 className="fw-bold" style={{color: '#b9935a'}}>{luxuryCount}</h2>
                                    <small className="text-muted">High-End Luxury Tier</small>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row className="g-4">
                        <Col lg={4}>
                            <Card className={`shadow-lg border-0 p-4 ${isEditing ? 'border border-primary bg-light' : 'bg-dark text-white'}`} style={{ borderRadius: '25px' }}>
                                <Card.Body>
                                    <h4 className="mb-4 text-center text-warning fw-bold">
                                        {isEditing ? "📝 Edit Scent" : "🚀 Upload New Scent"}
                                    </h4>
                                    <Form onSubmit={handleSubmitProduct}>
                                        <div className="text-center mb-4">
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Preview" className="rounded shadow-sm" style={{ width: '130px', height: '130px', objectFit: 'cover', border: '3px solid #b9935a' }} />
                                            ) : (
                                                <div className="mx-auto bg-secondary rounded d-flex align-items-center justify-content-center" style={{ width: '130px', height: '130px', border: '2px dashed #666' }}>
                                                    <span className="small text-muted text-center fw-bold">SCENT PHOTO<br/>REQUIRED</span>
                                                </div>
                                            )}
                                        </div>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold small text-uppercase">1. Select Scent Photo</Form.Label>
                                            <Form.Control 
                                                type="file" 
                                                accept="image/*" 
                                                onChange={handleFileChange}
                                                className="bg-secondary text-white border-0 shadow-none"
                                                required={!isEditing}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold small text-uppercase">2. Scent Name</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="e.g. Mystic Oud" 
                                                className="bg-secondary text-white border-0 py-2 shadow-none"
                                                value={newProduct.name}
                                                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                                                required
                                            />
                                        </Form.Group>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-bold small text-uppercase">3. Price (₦)</Form.Label>
                                                    <Form.Control 
                                                        type="number" 
                                                        className="bg-secondary text-white border-0 py-2 shadow-none"
                                                        value={newProduct.price}
                                                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-bold small text-uppercase">4. Category</Form.Label>
                                                    <Form.Select 
                                                        className="bg-secondary text-white border-0 py-2 shadow-none"
                                                        value={newProduct.category}
                                                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                                                    >
                                                        <option value="Fresh">Fresh</option>
                                                        <option value="Woody">Woody</option>
                                                        <option value="Floral">Floral</option>
                                                        <option value="Luxury">Luxury</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Form.Group className="mb-4">
                                            <Form.Label className="fw-bold small text-uppercase">5. Description</Form.Label>
                                            <Form.Control 
                                                as="textarea" rows={3}
                                                placeholder="Enter scent notes..."
                                                className="bg-secondary text-white border-0 py-2 shadow-none"
                                                value={newProduct.description}
                                                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                                                required
                                            />
                                        </Form.Group>

                                        <Button variant={isEditing ? "primary" : "warning"} type="submit" className="w-100 fw-bold py-3 shadow-lg border-0" disabled={loading} style={{borderRadius: '15px'}}>
                                            {loading ? 'PROCESSING...' : isEditing ? 'UPDATE FRAGRANCE' : 'PUSH TO COLLECTION'}
                                        </Button>

                                        {isEditing && (
                                            <Button variant="link" className="text-white w-100 mt-2 text-decoration-none small" onClick={handleCancelEdit}>
                                                Discard Changes
                                            </Button>
                                        )}
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
 
                        <Col lg={8}>
                            <Card className="shadow-lg border-0 p-3 bg-white h-100" style={{ borderRadius: '25px' }}>
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h4 className="fw-bold m-0">Live Catalog List</h4>
                                        <Badge bg="dark" className="px-3 py-2">{totalProducts} Items Total</Badge>
                                    </div>
                                    <div className="table-responsive">
                                        <Table hover borderless className="align-middle">
                                            <thead className="table-light">
                                                <tr className="text-uppercase small text-muted">
                                                    <th>Scent & Visual</th>
                                                    <th>Price</th>
                                                    <th className="text-center">Control</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.map((p) => (
                                                    <tr key={p._id} className="border-bottom">
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src={p.image} alt="scent" className="rounded me-3 shadow-sm" style={{ width: '50px', height: '50px', objectFit: 'cover', border: '1px solid #eee' }} />
                                                                <div>
                                                                    <div className="fw-bold">{p.name}</div>
                                                                    <Badge bg="secondary" style={{ fontSize: '0.65rem' }}>{p.category.toUpperCase()}</Badge>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="fw-bold text-success">₦{p.price.toLocaleString()}</td>
                                                        <td className="text-center">
                                                            <Button 
                                                                variant="outline-primary" 
                                                                size="sm" 
                                                                className="me-2 rounded-pill px-3 fw-bold" 
                                                                onClick={() => handleEditClick(p)}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button 
                                                                variant="danger" 
                                                                size="sm" 
                                                                className="px-3 rounded-pill fw-bold" 
                                                                onClick={() => handleDelete(p._id)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                        {products.length === 0 && (
                                            <div className="text-center py-5">
                                                <p className="text-muted">Your scent collection is empty. Start by uploading one!</p>
                                            </div>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}

            {activeTab === 'settings' && (
                <Row className="justify-content-center">
                    <Col lg={7}>
                        <Card className="glass-card border-0 shadow-lg p-5" style={{ borderRadius: '30px' }}>
                            <div className="text-center mb-5">
                                <h4 className="fw-bold text-uppercase">Website Global Settings</h4>
                                <p className="text-muted small">Update the text and contact info seen by your customers.</p>
                            </div>
                            
                            <Form onSubmit={handleSettingsUpdate}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="small fw-bold text-muted text-uppercase">1. Main Homepage Title</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        className="py-3 px-4 border-0 bg-light shadow-none"
                                        style={{ borderRadius: '15px' }}
                                        value={settings.heroTitle} 
                                        onChange={(e) => setSettings({...settings, heroTitle: e.target.value})} 
                                        required
                                    />
                                    <Form.Text className="text-muted">This is the large text students see first.</Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="small fw-bold text-muted text-uppercase">2. Homepage Slogan / Subtitle</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        rows={3}
                                        className="py-3 px-4 border-0 bg-light shadow-none"
                                        style={{ borderRadius: '15px' }}
                                        value={settings.heroSubtitle} 
                                        onChange={(e) => setSettings({...settings, heroSubtitle: e.target.value})} 
                                        required
                                    />
                                    <Form.Text className="text-muted">A short, catchy description for Scent Collective.</Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-5">
                                    <Form.Label className="small fw-bold text-muted text-uppercase">3. Orders WhatsApp Number</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        className="py-3 px-4 border-0 bg-light shadow-none"
                                        style={{ borderRadius: '15px' }}
                                        placeholder="e.g. 2348123456789"
                                        value={settings.contactWhatsapp} 
                                        onChange={(e) => setSettings({...settings, contactWhatsapp: e.target.value})} 
                                        required
                                    />
                                    <Form.Text className="text-muted">Include country code (234) with no '+' sign.</Form.Text>
                                </Form.Group>

                                <Button 
                                    variant="dark" 
                                    type="submit" 
                                    className="w-100 py-3 fw-bold shadow-lg" 
                                    disabled={loading}
                                    style={{ backgroundColor: '#b9935a', border: 'none', borderRadius: '15px' }}
                                >
                                    {loading ? 'SYNCHRONIZING...' : 'SAVE ALL WEBSITE CHANGES'}
                                </Button>
                            </Form>
                        </Card>
                        
                        <div className="text-center mt-4">
                            <p className="text-muted small">Changes will reflect instantly on the live website.</p>
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Admin;