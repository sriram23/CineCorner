import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../../components/movie-card";
import PopularMovies from "../../components/molecules/popular-movies";
import SearchMovie from "../../components/molecules/search-movie";
import Tabs from "../../components/tabs";
import './home.css'

import { useSelector, useDispatch } from "react-redux";
import { setUpComingMovies } from "../../slice/upcomingSlice";
import { setTopRatedMovies } from "../../slice/topRatedSlice";
import { setNowPlayingMovies } from "../../slice/nowPlayingSlice";
import { setPopularMovies } from "../../slice/movieSlice";
import SUN from '../../../assets/sun.png'
import MOON from '../../../assets/moon.png'
import NowPlaying from "../../components/molecules/now-playing";
import TopRated from "../../components/molecules/top-rated";
import Upcoming from "../../components/molecules/upcoming";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const nowPlaying = useSelector((state) => state.nowPlaying.movies);
  const popular = useSelector((state) => state.movie.movies);
  const topRated = useSelector((state) => state.topRated.movies);
  const upcoming = useSelector((state) => state.upcoming.movies);
  const dispatch = useDispatch();
  const NOW_PLAYING_URL =
    `https://api.themoviedb.org/3/movie/now_playing?langualge=en-US&page=1`;
  const POPULAR_URL =
    `https://api.themoviedb.org/3/movie/popular?langualge=en-US&page=1`;
  const TOP_RATED_URL =
    `https://api.themoviedb.org/3/movie/top_rated?langualge=en-US&page=1`;
  const UPCOMING_URL =
    `https://api.themoviedb.org/3/movie/upcoming?langualge=en-US&page=1`;

  const fetchMovies = async (url, selector) => {
    const res = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
      },
    });
    if (res.data && res.data.results) {
      console.log("Selector: ", selector)
      if(selector){
        dispatch(selector(res.data.results));
      }
      // dispatch({type: selector, payload: res.data.results})
    }
  }

  useEffect(() => {
    setIsloading(true);
    fetchMovies(NOW_PLAYING_URL, setNowPlayingMovies);
    fetchMovies(POPULAR_URL, setPopularMovies);
    fetchMovies(TOP_RATED_URL, setTopRatedMovies);
    fetchMovies(UPCOMING_URL, setUpComingMovies);
    setIsloading(false)
  }, []);

  const HOME_DATA = [
    {
      title: "Now Playing",
      data: nowPlaying,
      path: "/now_playing"
    },
    {
      title: "Popular",
      data: popular,
      path: '/popular'
    },
    {
      title: "Top Rated",
      data: topRated,
      path: '/top_rated'
    },
    {
      title: "Upcoming",
      data: upcoming,
      path: '/upcoming'
    }
  ]

  const handleCardClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="bg-primary text-white min-h-screen">
      {/* <div className="flex flex-col md:flex-row p-2 justify-between items-center sticky top-0 bg-secondary z-30">
        <div className="flex items-center">
          <img src={LOGO} alt="Cine Corner Logo" className="w-16 m-2" />
          <h1 className="text-4xl mb-4 pt-4 font-bold">Cine Corner</h1>
        </div>
      </div> */}
      <Header/>
      <div>
          {HOME_DATA.map((data) => (
            <div>
              <div className="flex justify-between">
                <h2 className="text-2xl p-4">{data.title}</h2>
                <button className="m-2 p-2 bg-secondary rounded-lg border border-white" onClick={() => navigate(data.path)}>View All</button>
              </div>
              <div className="flex flex-wrap lg:flex-nowrap lg:whitespace-nowrap lg:overflow-auto lg:scroll-smooth scrollbar-hide">
              {data.data && data.data.slice(0,5).map((movie) => (
                <MovieCard
                onCardClick={handleCardClick}
                key={movie.id}
                data={movie}
                loading={isLoading}
              />    
              ))}
              {/* Added shimmer cards, to prevent cumulative layout shift */}
              {!data.data.length && <div className="flex w-full">
                <MovieCard loading={true} />
                <MovieCard loading={true} />
                <MovieCard loading={true} />
                <MovieCard loading={true} />
                <MovieCard loading={true} />
                </div>}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
