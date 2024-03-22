import React, {useEffect} from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/home/home";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movie from "./pages/movie/movie";
import Footer from "./components/footer";
import Person from "./pages/person/person";
import { useSelector} from "react-redux";
import { useEffect } from "react";
import NowPlaying from "./components/molecules/now-playing";
import PopularMovies from "./components/molecules/popular-movies";
import TopRated from "./components/molecules/top-rated";
import Upcoming from "./components/molecules/upcoming";
import SearchMovie from "./components/molecules/search-movie";

const App = () => {
  return (
    <div className="min-h-screen bg-primary">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movie/:id" element={<Movie />}></Route>
          <Route path="/person/:id" element={<Person/>}></Route>
          <Route path="/now_playing" element={<NowPlaying/>}></Route>
          <Route path="/popular" element={<PopularMovies/>}></Route>
          <Route path="/top_rated" element={<TopRated/>}></Route>
          <Route path="/upcoming" element={<Upcoming/>}></Route>
          <Route path="/search" element={<SearchMovie/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <main>
        <App />
    </main>
    <footer>
        <Footer/>
    </footer>
</Provider>
);
