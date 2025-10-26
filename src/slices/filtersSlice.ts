import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  selectedMonth: number;
  selectedYear: number;
}

const now = new Date();

const initialState: FiltersState = {
  selectedMonth: now.getMonth(), // 0-11
  selectedYear: now.getFullYear(),
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSelectedDate(state, action: PayloadAction<{ month: number; year: number }>) {
      state.selectedMonth = action.payload.month;
      state.selectedYear = action.payload.year;
    },
  },
});

export const { setSelectedDate } = filtersSlice.actions;

export default filtersSlice.reducer;