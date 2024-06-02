import { createSlice } from "@reduxjs/toolkit";

interface DarkModeState {
  value: boolean;
}

const initialState: DarkModeState = {
  value: true,
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    click: (state) => {
      state.value = !state.value;
    },
    setDarkMode: (state) => {
      state.value = true;
    },
    removeDarkMode: (state) => {
      state.value = false;
    }
  }
});

export const { click, setDarkMode, removeDarkMode } = darkModeSlice.actions;

export const darkMode = (state: { darkMode: DarkModeState }) => state.darkMode.value;

export default darkModeSlice.reducer;
