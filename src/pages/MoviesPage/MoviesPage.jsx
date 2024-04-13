import React, { useEffect, useState } from 'react';
import css from './MoviesPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovies, getMovies } from '../../redux/movies/movies.reducer';
import {
  selectIsLoading,
  selectMovies,
  selectTotalMovies,
} from '../../redux/movies/movies.selectors';
import Movies from 'components/Movies/Movies';

import { selectFilterTerm } from '../../redux/filters/filters.selectors';
import LoadMoreBtn from 'components/LoadMoreBtn/LoadMoreBtn';
import { Bars } from 'react-loader-spinner';
import { Link, useLocation } from 'react-router-dom';

const MoviesPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const location = useLocation();

  const movies = useSelector(selectMovies);
  const allMovies = useSelector(selectTotalMovies);
  const filterTerm = useSelector(selectFilterTerm);
  const totalHits = useSelector(selectTotalMovies).length;
  const isLoading = useSelector(selectIsLoading);

  const filteredMovies = allMovies.filter(movie =>
    movie.title.toLowerCase().includes(filterTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(getMovies({ page: page, limit: 12 }));
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  return (
    <div className={css.movies_container}>
      {isLoading && (
        <div className={css.loader}>
          <Bars
            height="80"
            width="80"
            color="rgb(117, 117, 117)"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      {!isLoading && filteredMovies.length !== 0 ? (
        <>
          <Link
            state={{ from: location }}
            className={css.create_movie_link}
            to="/movies/create"
          >
            <span className={css.plus_item}>+</span>
            Create Movie
          </Link>
          <Movies movies={filterTerm === '' ? movies : filteredMovies} />
          <LoadMoreBtn
            page={page}
            setPage={setPage}
            totalHits={filterTerm === '' ? totalHits : filteredMovies.length}
          />
        </>
      ) : null}
      {!isLoading && filteredMovies.length === 0 && filterTerm !== '' && (
        <p className={css.no_found}>No movies were found for your request</p>
      )}
    </div>
  );
};

export default MoviesPage;
