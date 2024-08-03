import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cinemasId: null,
    cinemasName: null,
    movieByCinema: null,
};

const dataMovie = createSlice({
    name: "dataMovie",
    initialState,

    reducers: {
        setCinemasId: (state, action) => {
            state.cinemasId = action.payload
        },
        setCinemasName: (state, action) => {
            state.cinemasName = action.payload
        },
        setMovieByCinema: (state, action) => {
            state.movieByCinema = action.payload
        },
    },
});

export const { setCinemasId, setCinemasName, setMovieByCinema } = dataMovie.actions;
export default dataMovie