import STAR from '../../assets/star.png'
import CALENDAR from "../../assets/calendar.png";
import { useSelector } from "react-redux";
const MovieDetailsCard = ({ movie, onWatchTrailer }) => {
const genres = useSelector((state) => state.movie.genres);
const getGenres = (id) => {
    const genre = genres.find((genre) => genre.id == id);
    return genre.name
}
  if (movie) {
    return (
      <div
        style={{
          background: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="flex flex-col md:flex-row justify-center items-center relative text-white pt-20 pb-20"
      >
        <div
          id="overlay"
          className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 opacity-60 duration-700"
        ></div>
        <div className="m-4 z-50">
          <img
            className='rounded-xl'
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            alt="Movie Backdrop"
          />
        </div>
        <div className="w-full md:w-1/3 m-4 z-50 flex flex-col items-center md:items-start">
          <h2 className="text-2xl md:text-4xl m-2 font-bold">
            {movie.title} {movie.title !== movie.original_title && `(${movie.original_title})`}
          </h2>
          <div className="flex items-center mt-2 mb-2">
            <img className='w-8' src={STAR} alt="Star Rating" />
            <p className='m-2 text-2xl'>{movie.vote_average && movie.vote_average.toFixed(1)}/10</p>
          </div>
          <div className='flex items-center bg-black p-4 w-fit rounded-lg'>
            <p className='text-xl'>Watch Movie Trailer</p>
            <button className='bg-gray-300 text-black p-2 rounded-md shadow-xl m-2 ml-4' onClick={onWatchTrailer}>Watch Now</button>
          </div>
          <div>
            <p className='text-2xl mr-2 mt-2 mb-2'>{movie.original_language}</p>
          </div>
          <div className='flex'>
            {movie.genre_ids && movie.genre_ids.map((genre) => (
              <p className='mr-2 mt-2 mb-2 bg-gray-200 text-black p-2 rounded-md' key={genre}>{getGenres(genre)}</p>
            ))}
          </div>
          <div className='flex items-center mt-2 mb-2'>
            <img className='w-10' src={CALENDAR} alt="Released Date" />
            <p className='m-2 text-xl ml-4'>{movie.release_date}</p>
            </div>
        </div>
      </div>
    );
  }
};
export default MovieDetailsCard;
