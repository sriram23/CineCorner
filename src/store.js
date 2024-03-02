import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slice/movieSlice";
import searchReducer  from "./slice/searchSlice";
import mainReducer from "./slice/mainSlice";
import nowPlayingReducer from "./slice/nowPlayingSlice";
import topRatedReducer from "./slice/topRatedSlice";
import upcomingReducer from "./slice/upcomingSlice";

export const store = configureStore({
    reducer: {
        main: mainReducer,
        movie: movieReducer,
        search: searchReducer,
        nowPlaying: nowPlayingReducer,
        topRated: topRatedReducer,
        upcoming: upcomingReducer,
    },
})