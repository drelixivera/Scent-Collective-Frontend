import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';

const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
     
    if (password === "access-key-123") {
      localStorage.setItem("vendorToken", "secret-key-123");
      navigate("/admin-control"); 
    } else {
      setError("Invalid Access Key! ❌");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>  
      <Card style={{ width: '400px', backgroundColor: '#1a1a1a', color: 'white', border: '1px solid #333' }}>  
        <Card.Body className="p-4"> 
          <h4 className="text-center mb-4">Admin Control Center </h4> 
          {error && <div className="alert alert-danger py-2">{error}</div>}  
          <Form onSubmit={handleLogin}> 
            <Form.Group className="mb-3">
              <Form.Label>Enter Access Key</Form.Label> 
              <Form.Control 
                type="password" 
                placeholder="Enter key..." 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ backgroundColor: '#ffffff', color: 'black', border: 'none' }}
              />
            </Form.Group>
            <Button variant="warning" type="submit" className="w-100 fw-bold">
              Access
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;