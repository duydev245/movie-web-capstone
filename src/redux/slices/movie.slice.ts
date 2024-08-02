import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cinemas: null,
    cinemasInfor: null,
};

const dataMovie = createSlice({
    name: "dataMovie",
    initialState,

    reducers: {
        setCinemas: (state, action) => {
            state.cinemas = action.payload
        },
        setCinemasInfo: (state, action) => {
            state.cinemasInfor = action.payload
        },
    },
});

export const { setCinemas, setCinemasInfo } = dataMovie.actions;
export default dataMovie