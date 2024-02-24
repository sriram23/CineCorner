import axios from "axios"
import { useEffect, useState } from "react"
import MovieCard from "../../components/movie-card"
import './home.css'
import _ from "lodash"
const Home = () => {
    const [query, setQuery] = useState("")
    const URL= 'https://api.themoviedb.org/3/movie/popular?langualge=en-US&page=1'
    const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.API_KEY}`
    const [data, setData] = useState([])
    useEffect(() => {
      fetchMovie()
    },[])
    useEffect(() => {
        if(query) {
            searchMovie()
        } else {
            fetchMovie()
        }
    }, [query])
    const fetchMovie = async () => {
        const res = await axios.get(URL, {headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`
          }})
        console.log("Res: ",res)
        setData(res.data)
    }

    const searchMovie = async () => {
        const res = await axios.get(SEARCH_URL)
        console.log("Res: ",res)
        setData(res.data)
    }

    const handleSearch = (e) => {
        console.log("Value: ", e.target.value)
        setQuery(e.target.value)
    }
    return (
        <div className="home-container">
            <div className="flex p-2 justify-between items-center">
                <h1 className="text-4xl mb-4 pt-4 font-bold">Cine Corner</h1>
                <input onChange={_.debounce(handleSearch, 1000)} className="text=xl h-10 p-2 text-black rounded-md m-2 w-1/5" type="search" placeholder="Search for movies" />
            </div>
            <h2 className="text-3xl text-center mb-4 pt-4">Popular Movies</h2>
            <div className="flex flex-wrap justify-center">
            {data && data.results && data.results.map(movie => (
                <MovieCard key={movie.title} data={movie} />
            ))}
            </div>
        </div>
    )
}
export default Home