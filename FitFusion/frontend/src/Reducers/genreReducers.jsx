import {
    GENRE_LIST_REQUEST,
    GENRE_LIST_SUCCESS,
    GENRE_LIST_FAIL,

    GENRE_MOVIES_REQUEST,
    GENRE_MOVIES_SUCCESS,
    GENRE_MOVIES_FAIL,

 } from "../Constants/genreConstants";

export const genreListReducer = (state = {genres:[]}, action) => {
    switch (action.type) {
        case GENRE_LIST_REQUEST:
            return {loading:true, genres: []};
        case GENRE_LIST_SUCCESS:
            return {loading:false, genres: action.payload};
        case GENRE_LIST_FAIL:
            return {loading:false, error: action.payload};
        
        default:
            return state;
    }
};

export const genreMoviesReducer = (state = {genre:[]}, action) => {
    switch (action.type) {
        case GENRE_MOVIES_REQUEST:
            return {loading:true, ...state};
        case GENRE_MOVIES_SUCCESS:
            return {loading:false, genre: action.payload};
        case GENRE_MOVIES_FAIL:
            return {loading:false, error: action.payload};
        
        default:
            return state;
    }
};
