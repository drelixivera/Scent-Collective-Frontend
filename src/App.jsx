import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScentNavbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Product';
import WhyChooseUs from './components/WhyChooseUs';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';
import Adminpanel from './components/Admin.jsx';
import Login from './components/Login';

export default function App() {
  const appStyle = {
    overflowX: 'hidden',
    width: '100%',
    margin: '0',
    padding: '0',
    minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column'
  };
 
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("vendorToken") === "secret-key-123"; 
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div style={appStyle}>
        <ScentNavbar />
        
        <Routes>
          {/* MAIN HOME PAGE */}
          <Route path="/" element={
            <>
              <Hero />
              <div id="products"><Products /></div>
              <div id="why"><WhyChooseUs /></div>
              <div id="order"><OrderForm /></div>
            </>
          } />

          {/* LOGIN PAGE */}
          <Route path="/login" element={<Login />} />

          {/* PROTECTED ADMIN PANEL */}
          <Route 
            path="/admin-control" 
            element={
              <ProtectedRoute>
                <Adminpanel />
              </ProtectedRoute>
            } 
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}