import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { setPersonDetails } from "../../slice/movieSlice";

import axios from "axios";
const Person = () => {
    const person = useSelector((state) => state.movie.personDetails)
    const dispatch = useDispatch()
    const {id} = useParams()
    const PERSON_URL=`https://api.themoviedb.org/3/person/${id}?language=en-US`
    useEffect(() => {
        fetchPerson()
    }, [id])
    const fetchPerson = async () => {
        const res = await axios.get(PERSON_URL, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
            },
          });
          dispatch(setPersonDetails(res.data))
    }
    return (
        <div className="p-4">
            <img className="rounded-xl w-48  m-2" src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} alt="Person Image" />
            <h2 className="text-3xl">{person?.name}</h2>
            <p>{person?.biography}</p>
            <p className="text-xl">Known for: {person?.known_for_department}</p>
            <p className="text-xl">Birthday: {person?.birthday}</p>
            <p className="text-xl">Place of birth: {person?.place_of_birth}</p>
            {person?.deathday && <p className="text-xl">Death day: {person?.deathday} </p>}
            <p className="text-xl">Also known as: {person && person.also_known_as && person.also_known_as.join(", ")}</p>
            <p className="text-xl">Popularity: {person?.popularity}</p>
            {person?.homepage && <a className="text-xl underline" href={person?.homepage}>Home Page</a>}
        </div>
    )
}
export default Person