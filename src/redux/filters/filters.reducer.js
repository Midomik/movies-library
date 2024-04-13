import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterTerm: '',
  filteredMovies: null,
  isLoading: false,
  error: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter(state, { payload }) {
      state.filterTerm = payload;
    },
  },
});

export const filtersReducer = filtersSlice.reducer;
export const { setFilter, filterMovies } = filtersSlice.actions;
