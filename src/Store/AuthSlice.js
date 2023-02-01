import { createSlice } from "@reduxjs/toolkit";
const initialIdToken = localStorage.getItem("token");

const initialAuthState = {
  isLoggedIn: false,
  token: initialIdToken,
  email: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    loginHandler(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.idToken;
      state.email = action.payload.email;
    },
    logoutHandler(state) {
      state.isLoggedIn = false;
    },
    clearEmail(state) {
      state.email = null;
    },
  },
});
export default AuthSlice.reducer;
export const authActions = AuthSlice.actions;
