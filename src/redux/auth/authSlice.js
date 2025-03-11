import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Set user to null initially
  token: null, // Store authentication token
  routes: [],
  language: "en", // Default language (change as needed)
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { user, token, routes } = action.payload;
      if (token) {
        state.token = token;
      }
      if (routes) {
        state.routes = routes;
      }
      state.user = user;
    },

    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setLogin, setLogout, setLanguage, startLoading, stopLoading } =
  authSlice.actions;
export default authSlice.reducer;
