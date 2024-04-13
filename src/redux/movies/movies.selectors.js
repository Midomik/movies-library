export const selectMovies = state => state.moviesStore.movies.items;
export const selectMovieDetails = state => state.moviesStore.movies.itemDetails;
export const selectTotalMovies = state => state.moviesStore.movies.totalItems;
export const selectFavorites = state => state.moviesStore.favorites;
export const selectIsLoading = state => state.moviesStore.movies.isLoading;
