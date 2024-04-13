import React from 'react';
import css from './LoadMoreBtn.module.css';
import { useDispatch } from 'react-redux';
import { loadMore } from '../../redux/movies/movies.reducer';

const LoadMoreBtn = ({ page, setPage, totalHits }) => {
  const dispatch = useDispatch();

  const handlerLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(loadMore({ page: nextPage, limit: 12 }));
  };

  let isVisibleLoadMore = false;

  if (totalHits > 12 && Math.ceil(totalHits / 12) > page) {
    isVisibleLoadMore = true;
  }
  return (
    <>
      {isVisibleLoadMore && (
        <button className={css.load_more_btn} onClick={handlerLoadMore}>
          Load More
        </button>
      )}
    </>
  );
};

export default LoadMoreBtn;
