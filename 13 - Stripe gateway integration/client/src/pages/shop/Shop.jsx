import React from 'react'
import Product from './Product.jsx';
import { PRODUCTS } from '../../assets/products.js';
import './Shop.css';

const Shop = () => {
  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Il Legale Shop</h1>
      </div>
      <div className="products">
        {PRODUCTS.map((product, index) => (
          <Product key={index} data={product} />
        ))}
      </div>
    </div>
  )
}

export default Shop;