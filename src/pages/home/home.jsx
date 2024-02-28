import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../../components/movie-card";
import PageComponent from "../../components/page-component";
import "./home.css";
import _ from "lodash";
// Redux toolkit
import { useSelector, useDispatch } from "react-redux";
import { setMovies, setGenres, setCurrentPage, setTotalPages } from "../../slice/movieSlice";
// Router
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movie.movies);
  const currentPage = useSelector((state) => state.movie.currentPage);
  const totalPages = useSelector((state) => state.movie.totalPages);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const URL =
    `https://api.themoviedb.org/3/movie/popular?langualge=en-US&page=${currentPage}`;
  const GENRE_URL = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.API_KEY}`;
  // const [data, setData] = useState([])
  useEffect(() => {
    fetchMovie();
    fetchGenre();
  }, []);
  useEffect(() => {
    fetchMovie();
    fetchGenre();
  }, [currentPage]);
  useEffect(() => {
    searchMovie();
    dispatch(setCurrentPage(1))
  }, [query]);
  const fetchMovie = async () => {
    setIsloading(true);
    const res = await axios.get(URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
      },
    });
    console.log("Res: ", res);
    // setData(res.data)
    if (res.data && res.data.results) {
      dispatch(setMovies(res.data.results));
      dispatch(setTotalPages(res.data.total_pages))
    }
    setTimeout(() => {
      setIsloading(false);
    }, 2000)
  };

  const fetchGenre = async () => {
    const res = await axios.get(GENRE_URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
      },
    });
    console.log("Genre: ", res);
    if (res.data && res.data.genres) {
      dispatch(setGenres(res.data.genres));
    }
  };

  const searchMovie = async () => {
    setIsloading(true);
    if (query && query.length) {
      const res = await axios.get(SEARCH_URL);
      console.log("Res: ", res);
      if (res.data && res.data.results) {
        dispatch(setMovies(res.data.results));
        dispatch(setTotalPages(res.data.total_pages))
      }
    } else {
      fetchMovie();
    }
    setIsloading(false);
  };

  const handleSearch = (e) => {
    console.log("Value: ", e.target.value);
    setQuery(e.target.value);
  };

  const handleCardClick = (id) => {
    console.log("Value: ", id);
    navigate(`/movie/${id}`);
  };
  return (
    <div className="home-container">
      <div className="flex flex-col md:flex-row p-2 justify-between items-center">
        <h1 className="text-4xl mb-4 pt-4 font-bold">Cine Corner</h1>
        <input
          onChange={_.debounce(handleSearch, 1000)}
          className="text=xl h-10 p-2 text-black rounded-md m-2 w-full md:w-1/5"
          type="search"
          placeholder="Search for movies"
        />
      </div>
      <h2 className="text-3xl text-center mb-4 pt-4">Popular Movies</h2>
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
      <div>
        <PageComponent totalPages={totalPages} currenPage={currentPage} onPrevClick={() => dispatch(setCurrentPage(currentPage > 0 && currentPage - 1))} onNextClick={() => dispatch(setCurrentPage(currentPage < totalPages && currentPage + 1))} />
      </div>
    </div>
  );
};
export default Home;
