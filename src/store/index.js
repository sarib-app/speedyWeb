import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import businessReducer from "./businessSlice.js";
import authReducer from "./authSlice";
import profileReducer from "./profileSlice";
import registeredBusinessReducer from "./registeredBusinessSlice";
import registeredBusinessUserReducer from "./registeredBusinessUserSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    business: businessReducer,
    auth: authReducer,
    profile: profileReducer,
    registeredBusiness: registeredBusinessReducer,
    registeredBusinessUser: registeredBusinessUserReducer,
  },
});

export default store;
