import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
  current_user: null,
};

export const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { users, current_user } = action.payload;

      const uniqueUsers = users?.filter(
        (user) =>
          !state.users?.some(
            (existingUser) => existingUser?.mobile === user?.mobile
          )
      );

      state.users = [...state.users, ...uniqueUsers];
      state.current_user = current_user;
      state.loading = false;
    },

    setLogout: (state) => {
      state.current_user = null;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    setUserDetails: (state, action) => {
      const { name, lastName } = action.payload;
      if (state.current_user) {
        state.current_user.name = name;
        state.current_user.lastName = lastName;
      }
    },
  },
});

export const { setLogin, setLogout, startLoading, setUserDetails } =
  authSlice.actions;
export default authSlice.reducer;
