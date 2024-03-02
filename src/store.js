import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slice/movieSlice";
import searchReducer  from "./slice/searchSlice";
import mainReducer from "./slice/mainSlice";

export const store = configureStore({
    reducer: {
        main: mainReducer,
        movie: movieReducer,
        search: searchReducer
    },
})