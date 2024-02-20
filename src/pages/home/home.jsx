import axios from "axios"
import { useEffect, useState } from "react"
import MovieCard from "../../components/movie-card"
import './home.css'
const Home = () => {
    const URL= 'https://api.themoviedb.org/3/movie/popular?langualge=en-US&page=1'
    const [data, setData] = useState([])
    useEffect(() => {
      fetchMovie()
    },[])
    const fetchMovie = async () => {
        const res = await axios.get(URL, {headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`
          }})
        console.log("Res: ",res)
        setData(res.data)
    }
    return (
        <div className="home-container">
            <h1 className="text-3xl text-center mb-4 pt-4">Popular Movies</h1>
            <div className="flex flex-wrap justify-center">
            {data && data.results && data.results.map(movie => (
                <MovieCard key={movie.title} data={movie} />
            ))}
            </div>
        </div>
    )
}
export default Home