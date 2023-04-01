import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movies: [],
    featuredMovie: [],
    searchFilter: '',
    preventReload: false
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload;
        },
        setFeaturedMovie: (state, action) => {
            state.featuredMovie = action.payload;
        },
        setFilterValue: (state, action) => {
            state.searchFilter = action.payload;
        },
        setPreventReload: (state, action) => {
            state.preventReload = action.payload;
        },
    }
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;