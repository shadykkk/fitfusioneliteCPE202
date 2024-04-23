import {
  GENRE_LIST_REQUEST,
  GENRE_LIST_SUCCESS,
  GENRE_LIST_FAIL,
  GENRE_MOVIES_REQUEST,
  GENRE_MOVIES_SUCCESS,
  GENRE_MOVIES_FAIL,
  GENRE_ADD_REQUEST,
  GENRE_ADD_SUCCESS,
  GENRE_ADD_FAIL,
} from "../Constants/genreConstants";
import axios from "axios";

export const listGenres = () => async (dispatch) => {
  try {
    dispatch({
      type: GENRE_LIST_REQUEST,
    });

    const { data } = await axios.get("http://127.0.0.1:8000/api/genres"); //fetch the products from rest api

    dispatch({
      type: GENRE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GENRE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listGenreMovies = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GENRE_MOVIES_REQUEST,
    });

    const { data } = await axios.get(`http://127.0.0.1:8000/api/genreproducts/${id}`);

    dispatch({
      type: GENRE_MOVIES_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GENRE_MOVIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addGenre = (genre) => async (dispatch) => {
  try {
    dispatch({
      type: GENRE_ADD_REQUEST,
    });

    const { data } = await axios.post("http://127.0.0.1:8000/api/genres/create", genre); //create a new product

    dispatch({
      type: GENRE_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GENRE_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
