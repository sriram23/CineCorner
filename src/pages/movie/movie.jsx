import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MovieDetailsCard from "../../components/movie-details-card";
import { setCurrentId, setCredits } from "../../slice/movieSlice";
import Credit from "../../components/credit-card";
import Footer from "../../components/footer";
const Movie = () => {
    const movies = useSelector((state) => state.movie.movies);
    const credits = useSelector((state) => state.movie.credits);
    const {id} = useParams();
    const dispatch = useDispatch();
    const VIDEO_URL = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    const CREDITS_URL = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`
    const [currentMovie, setCurrentMovie] = useState();
    const getCurrentMovieVideo = async () => {
        const res = await axios.get(VIDEO_URL, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
            },
          });
          console.log("Video: ", res);
    }
    const getMovieCredits = async () => {
        const res = await axios.get(CREDITS_URL, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
            },
          });
          console.log("Credits: ", res);
          dispatch(setCredits(res.data))
    }
    useEffect(() => {
        const movie = movies.find((movie) => movie.id == id);
        setCurrentMovie(movie);
        getCurrentMovieVideo()
        getMovieCredits()
        dispatch(setCurrentId(id))
    }, [id])

    const scroll = (id, direction) =>{
        const scrollElement = document.getElementById(id);
        scrollElement.scrollLeft += direction === "left" ? -750 : 750;
    }
    return (
        <div className="flex flex-col items-center">
            <div className="w-full">
                <MovieDetailsCard movie={currentMovie} />
            </div>
            <div className="max-w-5xl m-2 mt-20">
                <h3 className="text-3xl mb-2">About the movie</h3>
                <p className="text-lg">{currentMovie?.overview}</p>
            </div>
            <div className="max-w-5xl m-2 mt-20">
                <h3 className="text-3xl mb-2 text-center lg:text-left">Cast</h3>
                <div className="flex items-center">
                {window.innerWidth > 768 &&<button className="m-4 p-4 text-white bg-black rounded-full" onClick={() => scroll("cast", "left")}>{'<'}</button>}
                <div id="cast" className="flex flex-wrap lg:flex-nowrap lg:whitespace-nowrap lg:overflow-auto lg:scroll-smooth lg:scrollbar-hide">
                {credits.cast.map((cast) => (
                    <Credit data={cast} />
                ))}
                </div>
                {window.innerWidth > 768 &&<button className="m-4 p-4 text-white bg-black rounded-full" onClick={() => scroll("cast", "right")}>{'>'}</button>}
                </div>
            </div>
            <div className="max-w-5xl m-2 mt-20">
                <h3 className="text-3xl mb-2 text-center lg:text-left">Crew</h3>
                <div className="flex items-center">
                    {window.innerWidth > 768 &&<button className="m-4 p-4 text-white bg-black rounded-full" onClick={() => scroll("crew", "left")}>{'<'}</button>}
                    <div id="crew" className="flex flex-wrap lg:flex-nowrap lg:whitespace-nowrap lg:overflow-auto lg:scroll-smooth lg:scrollbar-hide">
                {credits.crew.map((crew) => (
                    <Credit data={crew} />
                ))}
                </div>
                    {window.innerWidth > 768 && <button className="m-4 p-4 text-white bg-black rounded-full" onClick={() => scroll("crew", "right")}>{'>'}</button>}
                </div>
            </div>
        </div>
        
    )
}

export default Movie