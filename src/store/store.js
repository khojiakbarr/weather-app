import weatherSlice from "./sliceses/weatherSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    weather: weatherSlice,
  },
});

export default store;
