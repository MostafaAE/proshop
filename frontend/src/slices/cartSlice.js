import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {
      cartItems: [],
      shippingAddress: null,
      paymentMethod: 'PayPal',
    };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find(
        cartItem => item._id === cartItem._id
      );
      if (existItem)
        state.cartItems = state.cartItems.map(cartItem =>
          cartItem._id === item._id ? item : cartItem
        );
      else {
        state.cartItems.push(item);
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter(item => item._id !== id);

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    },
    resetCart: (state, action) => {
      localStorage.removeItem('cart');
      return initialState;
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;
