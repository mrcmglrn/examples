import React from 'react';
import ShopStore from "../../store/shopStore.jsx";

const cartItem = (props) => {
  const { id, name, price, image } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = ShopStore();

  return (
    <div className="cartItem">
      <img src={image} />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p>
          €{price} 
        </p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}>-</button>
          <input value={cartItems[id]} onChange={(e) => updateCartItemCount(Number(e.target.value), id)}/>
          <button onClick={() => addToCart(id)}>+</button>
        </div>
      </div>
    </div>
  )
}

export default cartItem