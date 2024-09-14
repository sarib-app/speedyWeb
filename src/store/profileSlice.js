import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  alias: "",
  name: "",
  imageUrl: "",
  isClosed: false,
  url: "",
  reviewCount: 0,
  rating: 0.0,
  phone: "",
  displayPhone: "",
  distance: 0.0,
  created_at: null,
  registered: false,
  serviceZipCodes: [],
  paymentMethods: [],
  badges: [],
  yearFound: "",
  videoUrl: "",
  ads: false,
  status: 0,
  errors: {},
  profileData: {},
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setAlias: (state, action) => {
      state.alias = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
    setIsClosed: (state, action) => {
      state.isClosed = action.payload;
    },
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    setReviewCount: (state, action) => {
      state.reviewCount = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
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
    setDisplayPhone: (state, action) => {
      state.displayPhone = action.payload;
    },
    setDistance: (state, action) => {
      state.distance = action.payload;
    },
    setCreatedAt: (state, action) => {
      state.created_at = action.payload;
    },
    setRegistered: (state, action) => {
      state.registered = action.payload;
    },
    setAds: (state, action) => {
      state.ads = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    clearProfileData: () => initialState,
  },
});

export default profileSlice.reducer;
export const {
  setId,
  setAlias,
  setName,
  setImageUrl,
  setIsClosed,
  setUrl,
  setReviewCount,
  setRating,
  setPhone,
  setDisplayPhone,
  setDistance,
  setCreatedAt,
  setRegistered,
  setAds,
  setStatus,
  setErrors,
  setProfileData,
  clearProfileData,
} = profileSlice.actions;
