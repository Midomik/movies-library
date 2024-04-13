import React, { useEffect, useRef } from 'react';
import css from './MoviePage.module.css';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  deleteMovie,
  getMoviesById,
  removeFromFavorites,
} from '../../redux/movies/movies.reducer';
import {
  selectFavorites,
  selectIsLoading,
  selectMovieDetails,
} from '../../redux/movies/movies.selectors';
import {
  BackArrowIcon,
  EditIcon,
  FavoriteIcon,
  TrashIcon,
} from 'assets/sprite';
import { Bars } from 'react-loader-spinner';

const MoviePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieId } = useParams();
  const movieDetails = useSelector(selectMovieDetails);
  const favorites = useSelector(selectFavorites);
  const isLoading = useSelector(selectIsLoading);

  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/');

  useEffect(() => {
    dispatch(getMoviesById(movieId));
  }, [movieId, dispatch]);

  
  let isFavorite;
  if (movieDetails) {
    isFavorite = favorites.includes(movieDetails.id);
  }

  const handlerClickOnFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movieDetails.id));
    } else {
      dispatch(addToFavorites(movieDetails.id));
    }
  };

  const handlerClickOnTrash = () => {
    dispatch(deleteMovie(movieDetails.id));
    navigate(backLinkRef.current);
  };

  const handlerClickOnEdit = () => {
    navigate(`/movies/${movieDetails.id}/edit`, {
      state: { from: location, data: movieDetails },
    });
  };

  return (
    <div className={css.movie_container}>
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
      {movieDetails !== null && (
        <>
          <div className={css.go_back_link}>
            <Link to={backLinkRef.current}>
              <BackArrowIcon /> Go Back
            </Link>
          </div>

          <div className={css.img_container}>
            <img
              className={css.movie_img}
              src={movieDetails.image}
              alt={movieDetails.title}
            />
            <div onClick={handlerClickOnFavorite} className={css.favorite_icon}>
              <FavoriteIcon isFavorite={isFavorite} />
            </div>

            <div onClick={handlerClickOnTrash} className={css.trash_icon}>
              <TrashIcon />
            </div>

            <div onClick={handlerClickOnEdit} className={css.edit_icon}>
              <EditIcon />
            </div>
          </div>

          <div className={css.data_container}>
            <h2 className={css.movie_title}>
              <span className={css.key_title}>Title:</span> {movieDetails.title}
            </h2>
            <div className={css.year_rating_genre_director_actors_container}>
              <p>
                <span className={css.key_title}>Release:</span>{' '}
                {movieDetails.release_date}
              </p>
              <p>
                <span className={css.key_title}>Rating:</span>{' '}
                {movieDetails.rating} ⭐
              </p>
              <p>
                <span className={css.key_title}>Genre:</span>{' '}
                {movieDetails.genre
                  .map(item => item.slice(0, 1).toUpperCase() + item.slice(1))
                  .join(', ')}
              </p>
              <p>
                <span className={css.key_title}>Director:</span>{' '}
                {movieDetails.director}
              </p>
              <p>
                <span className={css.key_title}>Actors:</span>{' '}
                {movieDetails.actors.join(', ')}
              </p>
            </div>
            <p className={css.movie_descr}>
              <span className={css.key_title}>Description:</span>{' '}
              {movieDetails.description}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default MoviePage;
