import React from 'react';
import css from './MoviesCard.module.css';
import { useLocation } from 'react-router-dom';
import { FavoriteIcon, TrashIcon } from 'assets/sprite';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addToFavorites,
  deleteMovie,
  removeFromFavorites,
} from '../../../redux/movies/movies.reducer';
import { selectFavorites } from '../../../redux/movies/movies.selectors';

const MoviesCard = ({
  id,
  title,
  description,
  rating,
  release_date,
  genre,
  actors,
  director,
  image,
}) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const [year, ,] = release_date.split('-');
  const navigate = useNavigate();
  const isFavorite = favorites.includes(id);
  const location = useLocation();

  const handlerClickOnFavorite = e => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(id));
    }
  };

  const handlerClickOnTrash = e => {
    e.stopPropagation();
    dispatch(deleteMovie(id));
  };

  const handlerClickCard = e => {
    if (
      e.currentTarget.id === 'favorite_field' ||
      e.currentTarget.id === 'trash_field'
    ) {
      return;
    }
    return navigate(`/movies/${id}`, { state: { from: location } });
  };

  return (
    <li onClick={handlerClickCard} className={css.card_container}>
      <img
        className={css.card_img}
        src={image}
        alt={title}
        width={250}
        height={350}
      />
      <div
        id="favorite_field"
        onClick={handlerClickOnFavorite}
        className={css.favoriteIcon_container}
      >
        <FavoriteIcon isFavorite={isFavorite} />
      </div>

      <div
        id="trash_field"
        onClick={handlerClickOnTrash}
        className={css.trash_icon_container}
      >
        <TrashIcon />
      </div>

      <div className={css.info_conteiner}>
        <h2 className={css.movie_titte}>{title}</h2>
        <div className={css.year_genre_container}>
          <div>
            <span className={css.movie_year}>{year}</span>,{' '}
            <span className={css.movie_genre}>{genre[0]}</span>,{' '}
          </div>

          <span className={css.movie_genre}>{rating} ⭐</span>
        </div>
      </div>
    </li>
  );
};

export default MoviesCard;
