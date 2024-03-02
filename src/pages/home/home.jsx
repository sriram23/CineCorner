import PopularMovies from "../../components/molecules/popular-movies";
import SearchMovie from "../../components/molecules/search-movie";
import Tabs from "../../components/tabs";
import './home.css'
import LOGO from '../../../assets/logo.png'
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from '../../slice/mainSlice'
import SUN from '../../../assets/sun.png'
import MOON from '../../../assets/moon.png'
const Home = () => {
  const theme = useSelector((state) => state.main.theme)
  const currentTab = useSelector((state) => state.main.currentTab)
  const dispatch = useDispatch()
  const switchTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
    if (theme === 'light') {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
  return (
    <div className="bg-light dark:bg-dark dark:text-light text-dark">
      <div className="flex flex-col md:flex-row p-2 justify-between items-center">
        <div className="flex items-center">
          <img src={LOGO} alt="Cine Corner Logo" className="w-16 m-2" />
          <h1 className="text-4xl mb-4 pt-4 font-bold">Cine Corner</h1>
        </div>
        <button className="bg-dark text-light dark:bg-light dark:text-dark p-2 rounded-md" onClick={switchTheme}>
          <img src={theme === 'light'? MOON : SUN} alt="Theme icon" />
        </button>
      </div>
      <Tabs
        tabs={["Popular", "Now Playing", "Top Rated", "Upcoming", "Search"]}
        contents={[
          <PopularMovies />,
          <h1>Now Playing</h1>,
          <h1>Top Rated</h1>,
          <h1>Upcoming</h1>,
          <SearchMovie />,
        ]}
      />
    </div>
  );
};

export default Home;
