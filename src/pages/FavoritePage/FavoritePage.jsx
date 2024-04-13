import LoadMoreBtn from 'components/LoadMoreBtn/LoadMoreBtn';
import Movies from 'components/Movies/Movies';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './FavoritePage.module.css';
import {
  selectFavorites,
  selectIsLoading,
  selectMovies,
  selectTotalMovies,
} from '../../redux/movies/movies.selectors';
import { getAllMovies } from '../../redux/movies/movies.reducer';
import { selectFilterTerm } from '../../redux/filters/filters.selectors';

const FavoritePage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const allMovies = useSelector(selectTotalMovies);
  const favoritesIds = useSelector(selectFavorites);
  const filterTerm = useSelector(selectFilterTerm);
  const isLoading = useSelector(selectIsLoading);

  const allfavoriteMovies = allMovies.filter(movie =>
    favoritesIds.includes(movie.id.toString())
  );

  const favoriteMovies = allfavoriteMovies.filter(movie =>
    movie.title.toLowerCase().includes(filterTerm.toLowerCase())
  );

  const itemsPerPage = 12;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = favoriteMovies.slice(0, endIndex);
  

  
  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);
  return (
    <div className={css.movies_container}>
      {currentItems.length !== 0 ? (
        <>
          <Movies movies={currentItems} />
          <LoadMoreBtn
            page={page}
            setPage={setPage}
            totalHits={favoriteMovies.length}
          />
        </>
      ) : filterTerm !== '' && currentItems.length === 0 ? (
        <>
          <p className={css.no_found}>No movies were found for your request</p>
        </>
      ) : filterTerm === '' && currentItems.length === 0 ? (
        <>
          <p className={css.no_found}>You don't have any favorite movies yet</p>
        </>
      ) : null}
    </div>
  );
};

export default FavoritePage;
