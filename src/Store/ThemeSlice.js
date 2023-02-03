import { createSlice } from "@reduxjs/toolkit";
const initialThemeState = { isToggle: false, isDark: false };
const ThemeSlie = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    showToggleButton(state) {
      state.isToggle = true;
    },
    setDark(state) {
      state.isDark = !state.isDark;
    },
    setLight(state) {
      state.isDark = false;
    },
  },
});
export default ThemeSlie.reducer;
export const themeActions = ThemeSlie.actions;
