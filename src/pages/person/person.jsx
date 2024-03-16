import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { setPersonDetails, setPersonCredits, setPersonImages } from "../../slice/movieSlice";

import axios from "axios";
import PersonCredit from "../../components/person-credit-card";

import ARROW_LEFT_WHITE from "../../../assets/ArrowLeftWhite.png"
import SUN from "../../../assets/sun.png"
import MOON from "../../../assets/moon.png"
const Person = () => {
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.main.theme)
    const person = useSelector((state) => state.movie.personDetails)
    const images = useSelector((state) => state.movie.personDetails.images)
    const [banner, setBanner] = useState()
 
  
    useEffect(() => {
      setBanner(images?.profiles[images.profiles.length-1]?.file_path)
    }, [images])
    const {id} = useParams()
    const PERSON_URL=`https://api.themoviedb.org/3/person/${id}?language=en-US`
    const CREDITS_URL=`https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`
    const IMAGE_URL=`https://api.themoviedb.org/3/person/${id}/images`
    useEffect(() => {
        fetchPerson()
        fetchPersonDetails()
        fetchPersonImages()
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
    const fetchPersonDetails = async () => {
        const res = await axios.get(CREDITS_URL, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
            },
          });
        //   Segregating the movies, that does not have a release date
          const invalidDateCast = await res.data && res.data.cast.filter(a => a.release_date === "")
          const invalidDateCrew = await res.data && res.data.crew.filter(a => a.release_date === "")
        //   Sorting the movies in reverse chronological order
          const sortedCast = await res.data && res.data.cast.filter((a) => a.release_date !== "").sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
          const sortedCrew = await res.data && res.data.crew.filter((a) => a.release_date !== "").sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
          dispatch(setPersonCredits({cast: [...invalidDateCast, ...sortedCast], crew: [...invalidDateCrew, ...sortedCrew]}))
    }
    const fetchPersonImages = async () => {
        const res = await axios.get(IMAGE_URL, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
            },
          });
          dispatch(setPersonImages(res.data))
    }
    return (
        <div className="bg-primary">
            <div className="flex relative justify-center" style={ banner &&{
                background: `url(https://image.tmdb.org/t/p/w500/${banner})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}>
                {/* banner image */}
                <div
                id="overlay"
                className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 opacity-60 duration-700"
                ></div>

                {/* Nav and theme buttons */}
                <div className="absolute top-0 left-0 m-4 z-50">
                  <button className="cursor-pointer"><img src={ARROW_LEFT_WHITE} alt="Back Button" onClick={() => window.history.back()}/></button>
                </div>
                <div className="absolute top-0 right-0 m-4 z-50">
                <button className="bg-dark text-white dark:bg-light dark:text-black p-2 rounded-md" onClick={() => switchTheme(theme)}>
                  <img src={theme === 'light'? MOON : SUN} alt="Theme icon" />
                </button>
                </div>

                <div className="z-50">
                {person && person.profile_path && <img className="rounded-xl w-48 m-10" src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} alt="Person Image" />}
                </div>
                
                <div className="text-white  w-full lg:w-1/3 z-50 m-10">
                    <h2 className="text-3xl mb-2 font-bold">{person?.name}</h2>
                    <p className="mb-2">{person?.biography}</p>
                    <p className="text-xl mb-2">Known for: {person?.known_for_department}</p>
                    <p className="text-xl mb-2">Birthday: {person?.birthday}</p>
                    <p className="text-xl mb-2">Place of birth: {person?.place_of_birth}</p>
                    {person?.deathday && <p className="text-xl mb-2">Death day: {person?.deathday} </p>}
                    <p className="text-xl mb-2">Also known as: {person && person.also_known_as && person.also_known_as.join(", ")}</p>
                    <p className="text-xl mb-2">Popularity: {person?.popularity}</p>
                    {person?.homepage && <a className="text-xl underline mb-2" href={person?.homepage}>Home Page</a>}
                </div>
            </div>
            <div className="w-full lg:w-2/3 m-auto text-black dark:text-white">
                <h2 className="text-2xl font-bold mt-2 mb-2">Acting</h2>
                {person.credits && person.credits.cast && person.credits.cast.map((credit) => <PersonCredit key={credit.id} credit={credit} type={'cast'}/>)}
                <h2 className="text-2xl font-bold mt-2 mb-2">Other Roles</h2>
                {person.credits && person.credits.crew && person.credits.crew.map((credit) => <PersonCredit key={credit.id} credit={credit} type={'crew'}/>)}
            </div>
        </div>
    )
}
export default Person