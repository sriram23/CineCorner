import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    genres: [],
    id: 0,
    credits: {
        cast: [],
        crew: []
    },
    trailer: {},
    currentPage: 1,
    totalPages: 0,
    currentReviews: [],
    personDetails: {},
    query: "",
}

export const searchSlice = createSlice({
  name: "search",
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

    setCurrentPage: (state, action) => {
        state.currentPage = action.payload
    },
    setTotalPages: (state, action) => {
        state.totalPages = action.payload
    },
    setCredits: (state, action) => {
        state.credits = action.payload
    },
    setTrailer: (state, action) => {
        state.trailer = action.payload
    },
    setCurrentReviews: (state, action) => {
        state.currentReviews = action.payload
    },
    setPersonDetails: (state, action) => {
        state.personDetails = action.payload
    },
    setQuery: (state, action) => {
        state.query = action.payload
    }
  }  
})

export const { setMovies, setGenres, setCurrentId, setCredits, setTrailer, setCurrentPage, setTotalPages, setCurrentReviews, setPersonDetails, setQuery } = searchSlice.actions
export default searchSlice.reducer