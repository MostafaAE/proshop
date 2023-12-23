import { createSlice } from '@reduxjs/toolkit';
import { addDecimals, updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {
      cartItems: [],
    };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log('heelo');
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
  },
});

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;
