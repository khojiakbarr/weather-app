import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "807321f501a27c09d574768c7a59a34e";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city, { rejectWithValue }) => {
    try {
      let weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      let weatherData = await weatherRes.json();

      if (weatherData.cod === "404") {
        weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Tashkent&appid=${API_KEY}&units=metric`
        );
        weatherData = await weatherRes.json();
      }

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      let forecastData = await forecastRes.json();

      if (forecastData.cod === "404") {
        const forecastResTashkent = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=Tashkent&appid=${API_KEY}&units=metric`
        );
        forecastData = await forecastResTashkent.json();
      }

      return { weatherData, forecastData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weatherData: null,
    forecastData: null,
    status: "idle", // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weatherData = action.payload.weatherData;
        state.forecastData = action.payload.forecastData;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
