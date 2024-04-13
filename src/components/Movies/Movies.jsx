import React from 'react';
import css from './Movies.module.css';
import MoviesCard from './MoviesCard/MoviesCard';

const Movies = ({ movies }) => {
  return (
    <div className={css.movies_list_container}>
      {movies && (
        <ul className={css.movies_list}>
          {movies.map(movie => {
            const {
              id,
              title,
              description,
              rating,
              release_date,
              genre,
              actors,
              director,
              image,
            } = movie;

            return (
              <MoviesCard
                key={id}
                id={id}
                title={title}
                description={description}
                rating={rating}
                release_date={release_date}
                genre={genre}
                actors={actors}
                director={director}
                image={image}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Movies;
