import SharedLayout from 'components/SharedLayout/SharedLayout';
import FavoritePage from './pages/FavoritePage/FavoritePage';
import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import { Route, Routes } from 'react-router-dom';
import MoviePage from 'pages/MoviePage/MoviePage';
import CreatingMoviePage from 'pages/CreatingMoviePage/CreatingMoviePage';

function App() {
  return (
    <SharedLayout>
      <Routes>
        <Route index path="/movies" element={<MoviesPage />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="/movies/create" element={<CreatingMoviePage />} />

        <Route path="/movies/:movieId" element={<MoviePage />} />
        <Route
          path="/movies/:movieId/edit"
          element={<CreatingMoviePage edit={true} />}
        />

        <Route path="*" element={<MoviesPage />} />
      </Routes>
    </SharedLayout>
  );
}

export default App;
