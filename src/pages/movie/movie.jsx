import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MovieDetailsCard from "../../components/movie-details-card";
const Movie = () => {
    const movies = useSelector((state) => state.movie.movies);
    const {id} = useParams();
    const VIDEO_URL = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
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
    useEffect(() => {
        const movie = movies.find((movie) => movie.id == id);
        setCurrentMovie(movie);
        getCurrentMovieVideo()
    }, [id])
    return (
        <div className="flex flex-col items-center">
            <div className="w-full">
                <MovieDetailsCard movie={currentMovie} />
            </div>
            <div className="max-w-5xl m-2 mt-20">
                <h3 className="text-2xl mb-2">About the movie</h3>
                <p className="text-lg">{currentMovie?.overview}</p>
            </div>
            
        </div>
        
    )
}

export default Movie