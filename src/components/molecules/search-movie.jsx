import MovieCard from "../../components/movie-card";
import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMovies, setTotalPages, setQuery } from "../../slice/searchSlice";
import { useNavigate, useLocation } from "react-router-dom";

const SearchMovie = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation()
    useEffect(() => {
      if(location.state) {
        dispatch(setQuery(location.state))
      }
    }, [])
    const query = useSelector((state) => state.search.query)
    const movies = useSelector((state) => state.search.movies)
    const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.API_KEY}`;
    const [isLoading, setIsloading] = useState(false);
    const [currentQuery, setCurrentQuery] = useState(query?query:location.state)
    useEffect(() => {
        searchForMovie()
    }, [query])
    // TODO: need to revisit if it's really required
    useEffect(() => {
      dispatch(setQuery(currentQuery))
    }, [currentQuery])
  const searchForMovie = async () => {
    setIsloading(true);
      const res = await axios.get(SEARCH_URL);
      if (res.data && res.data.results) {
        dispatch(setMovies(res.data.results));
        dispatch(setTotalPages(res.data.total_pages));
      }
    setIsloading(false);
  };
  const handleSearch = (e) => {
    setCurrentQuery(e.target.value);
    dispatch(setQuery(e.target.value));
  };
  const handleCardClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="search-container text-white flex flex-col">
      <div className="flex justify-center sm:justify-start">
        <input
        // TODO: Fix the value
          defaultValue={currentQuery}
          onChange={_.debounce(handleSearch, 1000)}
          className="text=xl h-10 p-2 text-black rounded-md m-2 w-4/5 sm:w-1/2 md:w-1/5"
          type="search"
          placeholder="Search for movies"
        />
      </div>
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
      <div className="flex justify-center items-center">
      {!movies.length && query && <h2>No movie with name {query} found!</h2>}
      {!query && !movies.length && <h2>Search For some movie, like "Avatar"</h2>}
      </div>
    </div>
  );
};
export default SearchMovie;
