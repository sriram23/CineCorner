import { useEffect, useState } from "react";
import LOGO from "../../assets/logo.png";
import SEARCH from "../../assets/search.webp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLanguage } from "../slice/mainSlice";

const Header = () => {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState([]);
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.main.currentLanguage)
  const LANGUAGE_URL="https://api.themoviedb.org/3/configuration/languages"
  const COUNTRY_URL="https://api.themoviedb.org/3/configuration/countries?language="+lang
  useEffect(() => {
    fetchLanguage()
    fetchCountry()
  }, [])
  useEffect(() => {
    fetchCountry()
  }, [lang])
  const fetchLanguage = async () => {
    const res = await axios.get(LANGUAGE_URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
      },
    });
    setLanguage(res.data)
  }
  const fetchCountry = async () => {
    const res = await axios.get(COUNTRY_URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
      },
    });
    setCountries(res.data)
  }
  return (
    <div className="flex flex-col md:flex-row p-2 justify-between items-center sticky top-0 bg-secondary z-30">
      <div className="flex items-center">
        <img src={LOGO} alt="Cine Corner Logo" className="w-16 m-2" />
        <h1 className="text-4xl mb-4 pt-4 font-bold">Cine Corner</h1>
      </div>
      <div className="text-black flex">
        <div className="m-2">
          <select className="bg-white border h-10 rounded-md">
            {countries && countries.length > 0 && countries.map(c => (
              <option key={c.iso_3166_1} value={c.iso_3166_1}>{c.native_name || c.english_name}</option>
            ))}
          </select>
        </div>
        <div className="m-2">
          <select
            className="bg-white border h-10 rounded-md"
            id="languageList"
            onChange={(e) => dispatch(setCurrentLanguage(e.target.value))}
          >
            {language && language.length > 0 && language.map(lg => (
              <option key={lg.iso_639_1} value={lg.iso_639_1}>{lg.name || lg.english_name}</option>
            ))}
          </select>
        </div>
        <div className="relative">
          <input
            onChange={(e) => setQuery(e.target.value)}
            className="p-2 rounded-md outline-0 m-2"
            type="text"
            placeholder="Search for a movie"
          />
          <button
            onClick={() => navigate("search/", { state: query })}
            className="bg-white rounded-md w-9 h-10 p-2 absolute right-2 top-2 border"
          >
            <img src={SEARCH} alt="Search Icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
