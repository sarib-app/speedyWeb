import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registeredBusinesses: [],
  currentEditBusiness: null,
  registeredUsers: [],
  currentEditUser: null,
  categories: [],
  currentEditCategory: null,
};

export const registeredBusinessUserSlice = createSlice({
  name: "registeredBusinessUser",
  initialState,
  reducers: {
    setRegisteredBusinesses: (state, action) => {
      state.registeredBusinesses = action.payload;
    },
    setCurrentEditBusiness: (state, action) => {
      state.currentEditBusiness = action.payload;
    },
    setRegisteredUsers: (state, action) => {
      state.registeredUsers = action.payload;
    },
    setCurrentEditUser: (state, action) => {
      state.currentEditUser = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCurrentEditCategory: (state, action) => {
      state.currentEditCategory = action.payload;
    },
  },
});

export const {
  setRegisteredBusinesses,
  setCurrentEditBusiness,
  setRegisteredUsers,
  setCurrentEditUser,
  setCategories,
  setCurrentEditCategory,
} = registeredBusinessUserSlice.actions;

export default registeredBusinessUserSlice.reducer;
