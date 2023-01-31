import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isLoggedIn: false };

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    loginHandler(state, action) {
      state.isLoggedIn = true;
    },
    logoutHandler(state) {
      state.isLoggedIn = false;
    },
  },
});
export default AuthSlice.reducer;
export const authActions = AuthSlice.actions;
