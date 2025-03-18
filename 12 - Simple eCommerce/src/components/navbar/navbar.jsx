import React from 'react'
import { Link } from 'react-router-dom';
import "./navbar.css";

const navbar = () => {
  return (
    <div className="navbar">
      <div className="links">
        <Link to="/home">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  )
}

export default navbar