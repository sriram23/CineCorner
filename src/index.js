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

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movie/:id" element={<Movie />}></Route>
          <Route path="/person/:id" element={<Person/>}></Route>
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
