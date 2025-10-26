import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  theme: "light" | "dark";
}

const initialState: AppState = {
  theme: (localStorage.getItem("theme") as "light" | "dark") || "light",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    resetAllData: () => {}, // Esta acción la maneja el rootReducer
  },
});

export const { setTheme, resetAllData } = appSlice.actions;
export default appSlice.reducer;
