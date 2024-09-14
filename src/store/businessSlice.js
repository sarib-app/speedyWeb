import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  businessName: "",
  details: "",
  address1: "",
  address2: "",
  address3: "",
  city: "",
  state: "",
  country: "",
  zipcode: "",
  serviceZipcodes: [],
  paymentMethods: [],
  badges: [],
  yearFound: "",
  videoUrl: "",
  websiteUrl: "",
  companySize: "",
  phone: "",
  errors: {},
  businessData: {},
};

export const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    setBusinessName: (state, action) => {
      state.businessName = action.payload;
    },
    setDetails: (state, action) => {
      state.details = action.payload;
    },
    setAddress1: (state, action) => {
      state.address1 = action.payload;
    },
    setAddress2: (state, action) => {
      state.address2 = action.payload;
    },
    setAddress3: (state, action) => {
      state.address3 = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setZipcode: (state, action) => {
      state.zipcode = action.payload;
    },
    setServiceZipcodes: (state, action) => {
      state.serviceZipcodes = action.payload;
    },
    setPaymentMethods: (state, action) => {
      state.paymentMethods = action.payload;
    },
    setBadges: (state, action) => {
      state.badges = action.payload;
    },
    setYearFound: (state, action) => {
      state.yearFound = action.payload;
    },
    setVideoUrl: (state, action) => {
      state.videoUrl = action.payload;
    },
    setWebsiteUrl: (state, action) => {
      state.websiteUrl = action.payload;
    },
    setCompanySize: (state, action) => {
      state.companySize = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setBusinessData: (state, action) => {
      state.businessData = action.payload;
    },
    clearBusinessData: () => initialState,
  },
});

export default businessSlice.reducer;
export const {
  setBusinessName,
  setDetails,
  setAddress1,
  setAddress2,
  setAddress3,
  setCity,
  setState,
  setCountry,
  setZipcode,
  setServiceZipcodes,
  setPaymentMethods,
  setBadges,
  setYearFound,
  setVideoUrl,
  setWebsiteUrl,
  setCompanySize,
  setPhone,
  setErrors,
  setBusinessData,
  clearBusinessData,
} = businessSlice.actions;
