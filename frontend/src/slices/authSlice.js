import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   userInfo: localStorage.getItem('userInfo')
//     ? JSON.parse(localStorage.getItem('userInfo'))
//     : null,
// };

const initialState = { userInfo: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      return state;
    },
    logout: (state, action) => {
      state.userInfo = null;
      return state;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
