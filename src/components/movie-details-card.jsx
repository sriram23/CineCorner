import STAR from "../../assets/white-star.png";
import CALENDAR from "../../assets/calendar.png";
import LANG from "../helpers/languages.json";
import moment from "moment";

import ARROW_LEFT_WHITE from "../../assets/ArrowLeftWhite.png"
import { useState, useEffect } from "react";
// import SUN from "../../assets/sun.png"
// import MOON from "../../assets/moon.png"
const MovieDetailsCard = ({ movie, onWatchTrailer }) => {
  const [bg, setBg] = useState('bg-green-500')
  const convertMinutesToSeconds = (minutes) => {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;

    // Ensure leading zeros if necessary
    hours = hours < 10 ? '0' + hours : hours;
    remainingMinutes = remainingMinutes < 10 ? '0' + remainingMinutes : remainingMinutes;

    return hours + 'h ' + remainingMinutes+'m';
  }
  const getReviewColor = (rating) => {
    if(rating) {
        if(rating > 7) {
            setBg('bg-green-500')
        } else if(rating > 5) {
            setBg('bg-yellow-500')
        } else {
            setBg('bg-red-500')
        }
    }
}
useEffect(() => {
  getReviewColor(movie &&movie.vote_average.toFixed(1))
}, [movie])
  if (movie) {
    return (
      <div
        style={{
          background: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="flex flex-col md:flex-row justify-center items-center relative text-white pt-20 pb-20"
      >
        {/* Nav and theme buttons */}
        <div className="absolute top-0 left-0 m-4 z-50">
          <button className="cursor-pointer"><img src={ARROW_LEFT_WHITE} alt="Back Button" onClick={() => window.history.back()}/></button>
        </div>
        {/* <div className="absolute top-0 right-0 m-4 z-50">
        <button className="bg-dark text-white dark:bg-light dark:text-black p-2 rounded-md" onClick={() => switchTheme(theme)}>
          <img src={theme === 'light'? MOON : SUN} alt="Theme icon" />
        </button>
        </div> */}
        {/* Actual Card */}
        <div
          id="overlay"
          className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 opacity-60 duration-700"
        ></div>
        <div className="m-4 z-50">
          <img
            className="rounded-xl"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt="Movie Backdrop"
          />
        </div>
        <div className="w-full md:w-1/3 m-4 z-50 flex flex-col items-center md:items-start">
          <h1 className="text-2xl md:text-4xl m-2 font-bold">
            {movie.original_title}{" "}
            {movie.title !== movie.original_title &&
              `(${movie.title})`}
          </h1>
          <h3 className="text-2xl md:text-lg m-2 text-slate-200">{movie.tagline}</h3>
          <div className="flex flex-wrap">
            {movie.genres &&
              movie.genres.map((genre) => (
                <p
                  className="mr-2 mt-2 mb-2 bg-gray-200 text-black p-2 rounded-md"
                  key={genre.id}
                >
                  {genre.name}
                </p>
              ))}
          </div>
          <div className={"flex items-center mt-2 mb-2 rounded-md "+bg}>
            <img className="w-5 h-5 m-1" src={STAR} alt="Star Rating" />
            <p className="m-2 text-2xl">
              {movie.vote_average && movie.vote_average.toFixed(1)}
            </p>
          </div>
          <div className="mb-2">
            <p className="font-bold">Overview:</p>
            <p>{movie.overview}</p>
          </div>
          <div className="flex items-center bg-secondary p-4 w-fit rounded-lg">
            <p className="text-xl">Watch Movie Trailer</p>
            <button
              className="bg-gray-300 text-black p-2 rounded-md shadow-xl m-2 ml-4"
              onClick={onWatchTrailer}
            >
              Watch Now
            </button>
          </div>
          <div className="flex items-center">
            <h2 className="text-2xl mr-2 mt-2 mb-2">
              {LANG[movie.original_language]}
            </h2>
            <li className="text-white"></li>
            {movie.runtime && (
              <h2 className="text-2xl mr-2 mt-2 mb-2">
                {convertMinutesToSeconds(movie.runtime)}
              </h2>
            )}
            <li className="text-white"></li>
            <h2 className="text-2xl mr-2 mt-2 mb-2">
              {movie.status}
            </h2>
          </div>
          <div className="flex items-center mt-2 mb-2">
            <img className="w-10" src={CALENDAR} alt="Released Date" />
            <p className="m-2 text-xl ml-4">{moment(movie.release_date).format("MMM DD, yyyy")}</p>
          </div>
          <div>
        <h3 className="font-bold mt-2 mb-2 text-center lg:text-left">Producers</h3>
        <div className="flex items-center">
          {movie && movie.production_companies.map(company => (
            <div className="m-4 ml-0">
            {!company.logo_path && <p className="">{company.name}</p>}
            {company.logo_path && <img title={company.name} className="bg-white p-2 h-10" src={'https://image.tmdb.org/t/p/w500'+company.logo_path} alt={'Image of '+company.name} />}
            </div>
          ))}
        </div>
        {movie.homepage && <button className="mt-2 text-xl underline" onClick={() => window.open(movie.homepage, '_blank')}>Home Page</button>}
      </div>
        </div>
      </div>
    );
  }
};
export default MovieDetailsCard;
