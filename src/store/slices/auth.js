import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auth: {
    username: '',
    password: ''
  },
  token: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthCridentials: (state, action) => {
      state.auth = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;