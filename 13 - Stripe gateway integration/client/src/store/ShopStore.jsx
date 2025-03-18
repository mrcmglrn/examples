import { create } from 'zustand';
import { PRODUCTS } from '../assets/products.js';

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopStore = create((set, get) => ({
  cartItems: getDefaultCart(),

  getTotalCartAmount: () => {
    let totalAmount = 0;
    const cartItems = get().cartItems;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  },

  addToCart: (itemId) => {
    set((state) => ({
      cartItems: { ...state.cartItems, [itemId]: state.cartItems[itemId] + 1 }
    }));
  },

  removeFromCart: (itemId) => {
    set((state) => ({
      cartItems: { ...state.cartItems, [itemId]: Math.max(0, state.cartItems[itemId] - 1) }
    }));
  },

  updateCartItemCount: (newAmount, itemId) => {
    set((state) => ({
      cartItems: { ...state.cartItems, [itemId]: newAmount }
    }));
  }
}));

export default ShopStore;