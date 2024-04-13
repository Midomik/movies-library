import React, { useEffect } from 'react';
import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filters/filters.reducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handlerFormFilter = e => {
    e.preventDefault();
    const { searchField } = e.target.elements;
    dispatch(setFilter(searchField.value));
  };

  useEffect(() => {}, []);
  return (
    <div className={css.filter_container}>
      <form onSubmit={handlerFormFilter} className={css.filter_form}>
        <input
          className={css.search_field}
          placeholder="Enter movie "
          type="text"
          name="searchField"
        />
        <button className={css.submit_btn} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Filter;
