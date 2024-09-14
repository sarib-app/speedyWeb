import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registeredBusinesses: [],
  currentEditBusiness: null,
};

export const registeredBusinessSlice = createSlice({
  name: "registeredBusiness",
  initialState,
  reducers: {
    setRegisteredBusinesses: (state, action) => {
      state.registeredBusinesses = action.payload;
    },
    setCurrentEditBusiness: (state, action) => {
      state.currentEditBusiness = action.payload;
    },
  },
});

export const { setRegisteredBusinesses, setCurrentEditBusiness } =
  registeredBusinessSlice.actions;

export default registeredBusinessSlice.reducer;
