import STAR from "../../assets/star.png";
import CALENDAR from "../../assets/calendar.png";
const MovieCard = ({ data }) => {
  return (
    <div className="w-1/4 m-4 card-container rounded-lg border-white border-2 p-4 cursor-pointer shadow-md flex justify-between flex-col">
      <div>
        <h2 className="text-2xl text-center mb-4 mt-4">
          {data.title}{" "}
          {!(data.title === data.original_title) &&
            "(" + data.original_title + ")"}
        </h2>
        <div>
          <img
            className="mb-4 w-full"
            src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`}
          />
          <p>{data.overview}</p>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <div className="flex">
            <img className="w-6 m-1" src={CALENDAR} alt="calendar" />
            <p className="m-1 mt-2 font-bold">{data.release_date}</p>
          </div>

          <div className="flex">
            <img className="w-6 m-1" src={STAR} alt="star" />
            <p className="m-1 mt-2 font-bold">{data.vote_average.toFixed(1)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieCard;
