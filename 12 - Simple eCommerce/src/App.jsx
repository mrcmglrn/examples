import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from'react-router-dom';
import './App.css'

// components
import Navbar from './components/navbar/navbar.jsx'
import Footer from './components/footer/footer.jsx'

// pages
import Cart from './pages/cart/cart.jsx'
//import Checkout from './pages/checkout/checkout.jsx'
import Contact from './pages/contact/contact.jsx'
import Home from './pages/home/home.jsx'
import Login from './pages/login/login.jsx'
import Shop from './pages/shop/shop.jsx'

function App() {
  const [language, setLanguage] = useState("it");

  return (
    <>
      <Router>
        <Navbar language={language} setLanguage={setLanguage} />
        <Routes>
          <Route path="/" exact element={<Home language={language} />} />
          <Route path="/home" exact element={<Home language={language} />} />
          <Route path="/shop" exact element={<Shop language={language} />} />
          <Route path="/cart" exact element={<Cart language={language} />} />
          <Route path="/contact" exact element={<Contact  language={language} />} />
          <Route path="/login" exact element={<Login language={language} />} />

          {/* default redirect to home page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer language={language} />
      </Router>
    </>
  )
}

export default App
