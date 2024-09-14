import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  business_id: null, // business_id is dynamic and set to null initially
  mondayStartTime: "08:00",
  mondayEndTime: "17:00",
  tuesdayStartTime: "08:00",
  tuesdayEndTime: "17:00",
  wednesdayStartTime: "08:00",
  wednesdayEndTime: "17:00",
  thursdayStartTime: "08:00",
  thursdayEndTime: "17:00",
  fridayStartTime: "08:00",
  fridayEndTime: "17:00",
  saturdayStartTime: "10:00",
  saturdayEndTime: "15:00",
  sundayStartTime: "00:00",
  sundayEndTime: "00:00",
  earliestStartTime: "08:00",
  latestEndTime: "17:00",
  slotDuration: 30,
  recurringSchedule: true,
  allowEmergencyRequest: false, // New field for emergency requests
  emergencyStartTime: "00:00", // New field for emergency start time
  emergencyEndTime: "23:59", // New field for emergency end time
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setBusinessId: (state, action) => {
      state.business_id = action.payload;
    },
    setMondayStartTime: (state, action) => {
      state.mondayStartTime = action.payload;
    },
    setMondayEndTime: (state, action) => {
      state.mondayEndTime = action.payload;
    },
    setTuesdayStartTime: (state, action) => {
      state.tuesdayStartTime = action.payload;
    },
    setTuesdayEndTime: (state, action) => {
      state.tuesdayEndTime = action.payload;
    },
    setWednesdayStartTime: (state, action) => {
      state.wednesdayStartTime = action.payload;
    },
    setWednesdayEndTime: (state, action) => {
      state.wednesdayEndTime = action.payload;
    },
    setThursdayStartTime: (state, action) => {
      state.thursdayStartTime = action.payload;
    },
    setThursdayEndTime: (state, action) => {
      state.thursdayEndTime = action.payload;
    },
    setFridayStartTime: (state, action) => {
      state.fridayStartTime = action.payload;
    },
    setFridayEndTime: (state, action) => {
      state.fridayEndTime = action.payload;
    },
    setSaturdayStartTime: (state, action) => {
      state.saturdayStartTime = action.payload;
    },
    setSaturdayEndTime: (state, action) => {
      state.saturdayEndTime = action.payload;
    },
    setSundayStartTime: (state, action) => {
      state.sundayStartTime = action.payload;
    },
    setSundayEndTime: (state, action) => {
      state.sundayEndTime = action.payload;
    },
    setEarliestStartTime: (state, action) => {
      state.earliestStartTime = action.payload;
    },
    setLatestEndTime: (state, action) => {
      state.latestEndTime = action.payload;
    },
    setSlotDuration: (state, action) => {
      state.slotDuration = action.payload;
    },
    setRecurringSchedule: (state, action) => {
      state.recurringSchedule = action.payload;
    },
    setAllowEmergencyRequest: (state, action) => {
      state.allowEmergencyRequest = action.payload;
    },
    setEmergencyStartTime: (state, action) => {
      state.emergencyStartTime = action.payload;
    },
    setEmergencyEndTime: (state, action) => {
      state.emergencyEndTime = action.payload;
    },
  },
});

export default settingsSlice.reducer;
export const {
  setBusinessId,
  setMondayStartTime,
  setMondayEndTime,
  setTuesdayStartTime,
  setTuesdayEndTime,
  setWednesdayStartTime,
  setWednesdayEndTime,
  setThursdayStartTime,
  setThursdayEndTime,
  setFridayStartTime,
  setFridayEndTime,
  setSaturdayStartTime,
  setSaturdayEndTime,
  setSundayStartTime,
  setSundayEndTime,
  setEarliestStartTime,
  setLatestEndTime,
  setSlotDuration,
  setRecurringSchedule,
  setAllowEmergencyRequest,
  setEmergencyStartTime,
  setEmergencyEndTime,
} = settingsSlice.actions;
