import React from 'react'
import Product from './product.jsx';
import { PRODUCTS } from '../../assets/products.js';
import './shop.css';

const shop = () => {
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

export default shop