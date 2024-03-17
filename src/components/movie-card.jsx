import { useState, useEffect } from "react";
import STAR from "../../assets/white-star.png";
import CALENDAR from "../../assets/calendar.png";
import PLACEHOLDER from "../../assets/Cine Corner Placeholder.png"
import moment from "moment";
const MovieCard = ({ data, onCardClick, loading }) => {
  const [bg, setBg] = useState('bg-green-500')
  useEffect(() =>{
    console.log("data", data)
    getReviewColor(data && data.vote_average.toFixed(1))
  },[data])
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
  if(loading) return (
    <div className="animate-pulse w-full md:w-1/3 xl:w-1/4 m-4 rounded-lg bg-light border-primary border-2 p-4 cursor-pointer shadow-md flex justify-between flex-col">
      <div className="h-2 m-2 bg-primary rounded"></div>
      <div className="h-96 m-2 bg-primary rounded"></div>
      <div className="h-2 m-2 bg-primary rounded"></div>
      <div className="h-2 m-2 bg-primary rounded"></div>
      <div className="h-2 m-2 bg-primary rounded"></div>
    </div>
  )
  return (
    <div onClick={() => onCardClick(data.id)} className="w-full md:w-1/3 xl:w-1/4 m-4 bg-secondary border border-secondary rounded-lg  cursor-pointer shadow-md flex justify-between flex-col">
          {data.poster_path ? 
          <figure className="w-full overflow-hidden z-20">
          <img
            className="w-full rounded-lg hover:scale-110 transition-transform overflow-hidden"
            src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
            alt={"Movie poster "+data.title}
          /></figure>: <figure><img
          className="w-full rounded-md"
          src={PLACEHOLDER}
        /></figure>}
          {/* <p>{data.overview.length > 150 ? data.overview.slice(0, 150) + "..." : data.overview}</p> */}
      <div className="p-2">
      <h2 className="text-2xl font-bold mt-2">
          {data.original_title}{" "}
          {!(data.title === data.original_title) &&
            "(" + data.title + ")"}
        </h2>
      <div>
        <div className="flex justify-between">
          <div className="flex">
            {/* <img className="w-6 m-1" src={CALENDAR} alt="calendar" /> */}
            <p className="m-1 mt-2 text-sm font-bold text-slate-400">{moment(data.release_date).format('MMM DD, yyyy')}</p>
          </div>
          <div className={"flex items-center rounded-xl "+bg}>
            <img className="w-3 h-3 m-1 mt-0 mb-0" src={STAR} alt="star" />
            <p className="m-1 font-bold pr-1 mt-0 mb-0 text-sm">{data.vote_average.toFixed(1)}</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
export default MovieCard;
