import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MovieDetailsCard from "../../components/movie-details-card";
import { setCurrentId, setCredits, setTrailer, setCurrentReviews } from "../../slice/movieSlice";
import Credit from "../../components/credit-card";
import TrailerModal from "../../components/trailer-modal";
import ReviewCard from "../../components/review-card";
const Movie = () => {
  const credits = useSelector((state) => state.movie.credits);
  const trailer = useSelector((state) => state.movie.trailer);
  const reviews = useSelector((state) => state.movie.currentReviews);
  const { id } = useParams();
  const dispatch = useDispatch();
  const MOVIE_BY_ID = `https://api.themoviedb.org/3/movie/${id}?language=en-US`
  const VIDEO_URL = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  const CREDITS_URL = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  const REVIEW_URL = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;
  const [currentMovie, setCurrentMovie] = useState();
  const [showTrailer, setShowTrailer] = useState(false);
  const getCurrentMovieVideo = async () => {
    const res = await axios.get(VIDEO_URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
      },
    });
    console.log("Video: ", res);
    dispatch(setTrailer(res.data));
  };
  const getMovieCredits = async () => {
    const res = await axios.get(CREDITS_URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
      },
    });
    console.log("Credits: ", res);
    dispatch(setCredits(res.data));
  };
  const getMovieById = async () => {
    const res = await axios.get(MOVIE_BY_ID,{
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
          },
        }
    )
    setCurrentMovie(res.data)
  }
  const getMovieReviews = async () => {
    const res = await axios.get(REVIEW_URL,{
      headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
        },
      }
    )
    console.log("Reviews: ", res.data)
    dispatch(setCurrentReviews(res.data && res.data.results))
  };
  useEffect(() => {
    getMovieById()
    getCurrentMovieVideo();
    getMovieCredits();
    dispatch(setCurrentId(id));
    getMovieReviews();
  }, [id]);

  const scroll = (id, direction) => {
    const scrollElement = document.getElementById(id);
    scrollElement.scrollLeft += direction === "left" ? -750 : 750;
  };
  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <MovieDetailsCard
          movie={currentMovie}
          onWatchTrailer={() => setShowTrailer(true)}
        />
      </div>
      <div className="max-w-5xl m-2 mt-20">
        <h3 className="text-3xl mb-2">About the movie</h3>
        <p className="text-lg">{currentMovie?.overview}</p>
      </div>
      <div className="max-w-5xl m-2 mt-20">
        <h3 className="text-3xl mb-2 text-center lg:text-left">Cast</h3>
        <div className="flex items-center">
          {window.innerWidth > 768 && (
            <button
              className="m-4 p-4 text-white bg-black rounded-full"
              onClick={() => scroll("cast", "left")}
            >
              {"<"}
            </button>
          )}
          <div
            id="cast"
            className="flex flex-wrap lg:flex-nowrap lg:whitespace-nowrap lg:overflow-auto lg:scroll-smooth scrollbar-hide"
          >
            {credits.cast.map((cast) => (
              <Credit data={cast} />
            ))}
          </div>
          {window.innerWidth > 768 && (
            <button
              className="m-4 p-4 text-white bg-black rounded-full"
              onClick={() => scroll("cast", "right")}
            >
              {">"}
            </button>
          )}
        </div>
      </div>
      <div className="max-w-5xl m-2 mt-20">
        <h3 className="text-3xl mb-2 text-center lg:text-left">Crew</h3>
        <div className="flex items-center">
          {window.innerWidth > 768 && (
            <button
              className="m-4 p-4 text-white bg-black rounded-full"
              onClick={() => scroll("crew", "left")}
            >
              {"<"}
            </button>
          )}
          <div
            id="crew"
            className="flex flex-wrap lg:flex-nowrap lg:whitespace-nowrap lg:overflow-auto lg:scroll-smooth scrollbar-hide"
          >
            {credits.crew.map((crew) => (
              <Credit data={crew} />
            ))}
          </div>
          {window.innerWidth > 768 && (
            <button
              className="m-4 p-4 text-white bg-black rounded-full"
              onClick={() => scroll("crew", "right")}
            >
              {">"}
            </button>
          )}
        </div>
      </div>
      <div className="max-w-5xl m-2 mt-20">
        <h3 className="text-3xl mb-2">Reviews</h3>
        {reviews && reviews.map(review => (
          <ReviewCard review={review}/>
        ))}
      </div>
      {showTrailer && trailer.results && trailer.results.length && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex w-full h-full items-center justify-center bg-black bg-opacity-70">
          <TrailerModal data={trailer} onClose={() => setShowTrailer(false)} />
        </div>
      )}

      {showTrailer && (!trailer.results || !trailer.results.length) && (
        <div className="fixed top-0 left-0 right-0 z-50 flex w-full items-start justify-center p-4">
            <div className="flex items-center bg-black text-white p-4 rounded-md border-red-500 border">
          <p className="">
            Trailer not available for this movie.
          </p>
          <button onClick={() => setShowTrailer(false)} className="text-white cursor-pointer m-2 bg-red-500 border-2 pl-1 pr-1 p-0 rounded-md">X</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
