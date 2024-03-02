import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slice/movieSlice";
import searchReducer  from "./slice/searchSlice";

export const store = configureStore({
    reducer: {
        movie: movieReducer,
        search: searchReducer
    },
})