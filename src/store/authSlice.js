import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authToken: null,
  errors: {}
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    removeAuthToken: state => {
      state.authToken = null;
    },
    setAuthErrors: (state, action) => {
      state.errors = action.payload;
    },
    clearAuthData: () => initialState
  }
});

export default authSlice.reducer;
export const { setAuthToken, removeAuthToken, setAuthErrors, clearAuthData } = authSlice.actions;
