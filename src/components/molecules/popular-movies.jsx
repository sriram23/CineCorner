import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../../components/movie-card";
import PageComponent from "../../components/page-component";

// Redux toolkit
import { useSelector, useDispatch } from "react-redux";
import { setPopularMovies, setGenres, setCurrentPage, setTotalPages, incrementCurrentPage } from "../../slice/movieSlice";
// Router
import { useNavigate } from "react-router-dom";
import Header from "../header";

const PopularMovies = () => {
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movie.movies);
  const currentPage = useSelector((state) => state.movie.currentPage);
  const totalPages = useSelector((state) => state.movie.totalPages);
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const URL =
    `https://api.themoviedb.org/3/movie/popular?langualge=en-US&page=${currentPage}`;
  const GENRE_URL = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  useEffect(() => {
    if(currentPage === 1) fetchMovie();
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalPages]);
  useEffect(() => {
    if(currentPage < totalPages) {
      appendMovies();
    }
  }, [currentPage]);

let scrollDebounce;
  const handleScroll = (e) => {
    clearTimeout(scrollDebounce);
    const totalHeight = document.body.offsetHeight;
    const scrollPosition = Math.ceil(window.scrollY + window.innerHeight);
    scrollDebounce = setTimeout(() => {
      if(scrollPosition >= totalHeight - 1) {
        dispatch(incrementCurrentPage(1));
      }
    },500)
  }

  const fetchMovie = async () => {
    setIsloading(true);
    const res = await axios.get(URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
      },
    });
    if (res.data && res.data.results) {
      dispatch(setPopularMovies(res.data.results));
      dispatch(setTotalPages(res.data.total_pages))
    }
    setTimeout(() => {
      setIsloading(false);
    }, 2000)
  };

  const appendMovies = async () => {
    console.log('Appending movies')
    const res = await axios.get(URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
      },
    });
    if (res.data && res.data.results) {
      dispatch(setPopularMovies([...movies, ...res.data.results]));
    }
  }
  const fetchGenre = async () => {
    const res = await axios.get(GENRE_URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
      },
    });
    if (res.data && res.data.genres) {
      dispatch(setGenres(res.data.genres));
    }
  };

  const handleCardClick = (id) => {
    navigate(`/movie/${id}`);
  };
  return (
    <div className="popular-container text-white">
      <Header/>
      <div className="flex flex-wrap justify-center">
        {movies &&
          movies.map((movie) => (
            <MovieCard
              onCardClick={handleCardClick}
              key={movie.id}
              data={movie}
              loading={isLoading}
            />
          ))}
      </div>
    </div>
  );
};
export default PopularMovies;
