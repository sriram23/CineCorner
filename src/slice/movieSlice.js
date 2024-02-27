import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    genres: [],
    id: 0,
    credits: {
        cast: [],
        crew: []
    },
    trailer: {}
}

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
        state.movies = action.payload
    },
    setGenres: (state, action) => {
        state.genres = action.payload
    },
    setCurrentId: (state, action) => {
        state.id = action.payload
    },
    setCredits: (state, action) => {
        state.credits = action.payload
    },
    setTrailer: (state, action) => {
        state.trailer = action.payload
    }
  }  
})

export const { setMovies, setGenres, setCurrentId, setCredits, setTrailer } = movieSlice.actions
export default movieSlice.reducer