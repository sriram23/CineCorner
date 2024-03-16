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
    totalPages: 1,
    currentReviews: [],
    personDetails: {},
    similarMovies: [],
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

    setCurrentPage: (state, action) => {
        state.currentPage = action.payload
    },
    incrementCurrentPage: (state, action) => {
        state.currentPage += action.payload  
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
    setPersonCredits: (state, action) => {
        state.personDetails.credits = action.payload
    },
    setPersonImages: (state, action) => {
        state.personDetails.images = action.payload
    },
    setSimilarMovies: (state, action) => {
        state.similarMovies = action.payload
    }
  }  
})

export const { setMovies, setGenres, setCurrentId, setCredits, setTrailer, setCurrentPage, setTotalPages, setCurrentReviews, setPersonDetails, incrementCurrentPage, setPersonCredits, setPersonImages, setSimilarMovies } = movieSlice.actions
export default movieSlice.reducer