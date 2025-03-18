import React from 'react'
import ShopStore from "../../store/shopStore.jsx";

const product = (props) => {
  const { id, name, price, image } = props.data;
  const { cartItems, addToCart } = ShopStore();
  
  const cartItemCount = cartItems[id];

  return (
    <div className="product">
      <img src={image} />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p>
          €{price} 
        </p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart { cartItemCount > 0 && <> ({ cartItemCount }) </>}
      </button>
    </div>
  )
}

export default product