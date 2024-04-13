import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import axios from 'axios';
import { Notify } from 'notiflix';

axios.defaults.baseURL = 'https://6617f0cd9a41b1b3dfbbc273.mockapi.io/';

const initialState = {
  movies: {
    totalItems: [],
    items: [],
    itemDetails: null,
    isLoading: false,
    error: null,
  },
  favorites: [],
};

export const getMovies = createAsyncThunk(
  'movies/get',
  async (res, thunkApi) => {
    try {
      const { data } = await axios.get(
        'movies',
        res.page
          ? {
              params: { page: res.page, limit: res.limit },
            }
          : {}
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const getMoviesById = createAsyncThunk(
  'movies/getById',
  async (movieId, thunkApi) => {
    try {
      const { data } = await axios.get(`movies/${movieId}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getAllMovies = createAsyncThunk(
  'movies/getAll',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get('movies');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loadMore = createAsyncThunk(
  'movies/loadMore',
  async (res, thunkApi) => {
    try {
      const { data } = await axios.get(
        'movies',
        res.page
          ? {
              params: { page: res.page, limit: res.limit },
            }
          : {}
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const createMovie = createAsyncThunk(
  'movies/createMovie',
  async (res, thunkApi) => {
    try {
      const { data } = await axios.post('movies', res);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  'movies/deleteMovie',
  async (movieId, thunkApi) => {
    try {
      const { data } = await axios.delete(`movies/${movieId}`);

      return data.id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateMovie = createAsyncThunk(
  'movies/updateMovie',
  async (payload, thunkApi) => {
    try {
      const { data } = await axios.put(`movies/${payload.id}`, payload.data);
      return data.id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const MoviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addToFavorites: (state, { payload }) => {
      state.favorites.push(payload);
    },
    removeFromFavorites: (state, { payload }) => {
      state.favorites = state.favorites.filter(id => id !== payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMovies.fulfilled, (state, { payload }) => {
        state.movies.isLoading = false;
        state.movies.items = [...payload];
      })
      .addCase(getMoviesById.fulfilled, (state, { payload }) => {
        state.movies.isLoading = false;
        state.movies.itemDetails = payload;
      })
      .addCase(getAllMovies.fulfilled, (state, { payload }) => {
        state.movies.isLoading = false;
        state.movies.totalItems = payload;
      })
      .addCase(loadMore.fulfilled, (state, { payload }) => {
        state.movies.isLoading = false;
        state.movies.items = [...state.movies.items, ...payload];
      })
      .addCase(createMovie.fulfilled, (state, { payload }) => {
        state.movies.isLoading = false;
        state.movies.items = [...state.movies.items, payload];
      })
      .addCase(deleteMovie.fulfilled, (state, { payload }) => {
        state.movies.isLoading = false;
        state.movies.items = state.movies.items.filter(
          item => item.id !== payload
        );
        state.movies.totalItems = state.movies.totalItems.filter(
          item => item.id !== payload
        );
        Notify.success('You have successfully deleted the movie!');
      })
      .addMatcher(
        isAnyOf(
          getMovies.pending,
          getMoviesById.pending,
          loadMore.pending,
          createMovie.pending,
          getAllMovies.pending,
          deleteMovie.pending,
          updateMovie.pending
        ),
        state => {
          state.movies.isLoading = true;
          state.movies.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getMovies.rejected,
          getMoviesById.rejected,
          loadMore.rejected,
          createMovie.rejected,
          getAllMovies.pending,
          deleteMovie.rejected,
          updateMovie.pending
        ),
        (state, { payload }) => {
          state.movies.isLoading = false;
          state.movies.error = payload;
        }
      );
  },
});

export const moviesReducer = MoviesSlice.reducer;
export const { addToFavorites, removeFromFavorites } = MoviesSlice.actions;
