import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    genres: []
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
  }  
})

export const { setMovies, setGenres } = movieSlice.actions
export default movieSlice.reducer