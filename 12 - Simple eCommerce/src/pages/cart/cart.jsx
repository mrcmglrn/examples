import React from 'react';
import ShopStore from '../../store/shopStore.jsx';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../assets/products.js';
import CartItem from './cartItem.jsx';
import "./cart.css";

const cart = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalCartAmount } = ShopStore();
  
  const totalAmount = getTotalCartAmount();

  return (
    <div className="cart">
      <div>
        <h1> Your Cart Items </h1>
      </div>
      <div className="cartItems">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
        })}
      </div>

      { totalAmount > 0 ?
        <div className="checkout">
          <p>Subtotal: ${totalAmount}</p>
          <button onClick={() => navigate('/shop')}>Continue Shopping</button>
          <button>Checkout</button>
        </div>
        :
        <h1>
          It's empty!
        </h1>
      }
    </div>
  )
}

export default cart