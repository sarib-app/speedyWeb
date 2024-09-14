import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  firstName: '', // Add firstName
  lastName: '',  // Add lastName
  email: '',     // Add email
  phone: '',     // Add phone
  password: '',
  confirmPassword: '', // Add confirmPassword
  errors: {},
  userData: {}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setFirstName: (state, action) => { // Add setFirstName
      state.firstName = action.payload;
    },
    setLastName: (state, action) => { // Add setLastName
      state.lastName = action.payload;
    },
    setEmail: (state, action) => { // Add setEmail
      state.email = action.payload;
    },
    setPhone: (state, action) => { // Add setPhone
      state.phone = action.payload;
    },
    setConfirmPassword: (state, action) => { // Add setConfirmPassword
      state.confirmPassword = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    clearData: () => initialState
  }
});

export default userSlice.reducer;
export const {
  setUsername,
  setPassword,
  setFirstName,
  setLastName,
  setEmail,
  setPhone,
  setConfirmPassword,
  setErrors,
  setUserData,
  clearData
} = userSlice.actions;
