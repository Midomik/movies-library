import React, { useRef, useState } from 'react';
import css from './CreatingMoviePage.module.css';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { useDispatch} from 'react-redux';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { nanoid } from 'nanoid';
import { storage } from './config';
import { options } from './optionsData';
import { customStyles } from './selectStyles';
import {
  createMovie,
  updateMovie,
} from '../../redux/movies/movies.reducer';
import { BackArrowIcon } from 'assets/sprite';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Notify } from 'notiflix';
import { Bars } from 'react-loader-spinner';

const CreateMoviePage = ({ edit }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const navigate = useNavigate();
  const backLinkRef = useRef(location.state?.from ?? '/');
  const movie = location.state.data;
  let isLoading;

  const [file, setFile] = useState(null);

  const handlerForm = async values => {
    try {
      if (file == null && !edit) return;
      let downloadURL;
      isLoading = true;
      if (file) {
        const storageRef = ref(storage, `movies/${file.name + nanoid()}`);
        await uploadBytes(storageRef, file);
        downloadURL = await getDownloadURL(storageRef);
      } else {
        downloadURL = movie.image;
      }

      const arrayOfActors = values.actors.split(',');

      values.image = downloadURL;
      values.actors = arrayOfActors;
      values.rating = Number(values.rating);
      edit ? (values.id = movie.id) : (values.id = nanoid());
      values.genre = Array.isArray(values.genre)
        ? values.genre
        : values.genre.split(',');

      const data = { id: values.id, data: values };
      edit ? dispatch(updateMovie(data)) : dispatch(createMovie(values));

      Notify.success(
        `You have successfully ${
          edit ? 'edited your' : 'created a new'
        } movie!! You will be redirected to the movies page after 2 seconds`
      );

      setTimeout(() => {
        navigate('/movies');
        isLoading = false;
      }, 3000);
    } catch (error) {
      return console.log(error);
    }
  };

  const handlerImageChange = e => {
    setFile(e.target.files[0]);
  };
  let initialValues;
  if (movie && edit) {
    initialValues = {
      title: movie.title,
      description: movie.description,
      rating: movie.rating,
      release_date: movie.release_date,
      genre: movie.genre.join(', '),
      actors: movie.actors.join(', '),
      director: movie.director,
      image: '',
    };
  } else {
    initialValues = {
      title: '',
      description: '',
      rating: '',
      release_date: '',
      genre: '',
      actors: '',
      director: '',
      image: '',
    };
  }

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const defaultOption =
    movie &&
    edit &&
    movie.genre.map(item => ({
      value: capitalizeFirstLetter(item),
      label: capitalizeFirstLetter(item),
    }));
  return (
    <div className={css.movies_container}>
      <div className={css.go_back_link}>
        <Link to={backLinkRef.current}>
          <BackArrowIcon /> Go Back
        </Link>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          title: Yup.string().required('This field is mandatory'),
          description: Yup.string().required('This field is mandatory'),
          rating: Yup.number()
            .typeError('This field must be a number')
            .required('This field is mandatory'),
          release_date: Yup.string()
            .matches(
              /^\d{4}-\d{2}-\d{2}$/,
              'The date must be in the format YYYY-MM-DD'
            )
            .required('This field is mandatory'),
          genre: Yup.mixed(),

          actors: Yup.string().required('This field is mandatory'),
          director: Yup.string().required('This field is mandatory'),
          image: Yup.mixed(),
        })}
        onSubmit={value => handlerForm(value)}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className={css.form}>
            <label className={`${css.upload_image_lable} ${css.form_lable}`}>
              {!file && !edit && (
                <div className={css.field_input}>
                  <p className={css.add_field_title}>
                    <span>+</span>Add image
                  </p>
                </div>
              )}
              <input
                className={css.upload_image_field}
                id="upload_field"
                name="image"
                type="file"
                placeholder=""
                onChange={handlerImageChange}
              />
              {(file && file.name) || edit ? (
                <img
                  className={css.uploaded_image}
                  src={edit && !file ? movie.image : URL.createObjectURL(file)}
                  alt="Uploaded"
                  width={300}
                  height={350}
                />
              ) : null}
              {errors.image && touched.image && !file.name && (
                <div className={css.error_container}>{errors.image}</div>
              )}
            </label>

            <label className={css.form_lable}>
              <p>Title</p>
              <Field
                className={`${css.field} ${css.title_field}`}
                name="title"
                type="text"
                placeholder="Batman"
              />
              {errors.title && touched.title ? (
                <div className={css.error_container}>{errors.title}</div>
              ) : null}
            </label>

            <label className={css.form_lable}>
              <p>Genre</p>
              <Select
                isMulti
                name="genre"
                defaultValue={edit && movie ? defaultOption : null}
                options={options.map(option => ({
                  value: option,
                  label: option,
                }))}
                className="basic-multi-select"
                classNamePrefix="select"
                styles={customStyles}
                onChange={choice => {
                  setFieldValue(
                    'genre',
                    choice.map(item => item.value)
                  );
                }}
              />

              {errors.genre && touched.genre ? (
                <div className={css.error_container}>{errors.genre}</div>
              ) : null}
            </label>

            <label className={css.form_lable}>
              <p>Description</p>
              <Field
                className={`${css.field} ${css.description_field}`}
                name="description"
                type="text"
                placeholder="The story of the..."
              />
              {errors.description && touched.description ? (
                <div className={css.error_container}>{errors.description}</div>
              ) : null}
            </label>

            <label className={css.form_lable}>
              <p>Rating</p>
              <Field
                className={`${css.field} ${css.rating_field}`}
                name="rating"
                type="text"
                placeholder="5.5"
              />
              {errors.rating && touched.rating ? (
                <div className={css.error_container}>{errors.rating}</div>
              ) : null}
            </label>

            <label className={css.form_lable}>
              <p>Release date</p>
              <Field
                className={`${css.field} ${css.release_date_field}`}
                name="release_date"
                type="text"
                placeholder="1957-04-10"
              />
              {errors.release_date && touched.release_date ? (
                <div className={css.error_container}>{errors.release_date}</div>
              ) : null}
            </label>

            <label className={css.form_lable}>
              <p>Actors</p>
              <Field
                className={`${css.field} ${css.actors_field}`}
                name="actors"
                type="text"
                placeholder="John Travolta, Uma Thurman, ..."
              />
              {errors.actors && touched.actors ? (
                <div className={css.error_container}>{errors.actors}</div>
              ) : null}
            </label>

            <label className={css.form_lable}>
              <p>Director</p>
              <Field
                className={`${css.field} ${css.director_field}`}
                name="director"
                type="text"
                placeholder="Quentin Tarantino ..."
              />
              {errors.director && touched.director ? (
                <div className={css.error_container}>{errors.director}</div>
              ) : null}
            </label>

            <button className={css.form_submit} type="submit">
              {edit ? 'Edit' : 'Add'}
              {isLoading && (
                <div className={css.loader}>
                  <Bars
                    height="20"
                    width="20"
                    color="rgb(117, 117, 117)"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateMoviePage;
