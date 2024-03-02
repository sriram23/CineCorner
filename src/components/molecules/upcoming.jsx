import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../../components/movie-card";
import PageComponent from "../../components/page-component";

// Redux toolkit
import { useSelector, useDispatch } from "react-redux";
import { setMovies, setGenres, setCurrentPage, setTotalPages } from "../../slice/upcomingSlice";
// Router
import { useNavigate } from "react-router-dom";

const Upcoming = () => {
  const navigate = useNavigate();
  const movies = useSelector((state) => state.upcoming.movies);
  const currentPage = useSelector((state) => state.upcoming.currentPage);
  const totalPages = useSelector((state) => state.upcoming.totalPages);
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const URL =
    `https://api.themoviedb.org/3/movie/upcoming?langualge=en-US&page=${currentPage}`;
  const GENRE_URL = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  useEffect(() => {
    fetchMovie();
    fetchGenre();
  }, []);
  useEffect(() => {
    fetchMovie();
    fetchGenre();
  }, [currentPage]);

  const fetchMovie = async () => {
    setIsloading(true);
    const res = await axios.get(URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
      },
    });
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
    if (res.data && res.data.genres) {
      dispatch(setGenres(res.data.genres));
    }
  };

  const handleCardClick = (id) => {
    navigate(`/movie/${id}`);
  };
  return (
    <div className="popular-container">
      <h2 className="text-3xl text-center mb-4 pt-4">Upcoming Movies</h2>
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
export default Upcoming;
