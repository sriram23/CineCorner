import PopularMovies from "../../components/molecules/popular-movies";
import SearchMovie from "../../components/molecules/search-movie";
import Tabs from "../../components/tabs";
import './home.css'
import LOGO from '../../../assets/logo.png'
import { useSelector } from "react-redux";
import SUN from '../../../assets/sun.png'
import MOON from '../../../assets/moon.png'
import NowPlaying from "../../components/molecules/now-playing";
import TopRated from "../../components/molecules/top-rated";
import Upcoming from "../../components/molecules/upcoming";

const Home = () => {
  const theme = useSelector((state) => state.main.theme)
  return (
    <div className="bg-primary text-white">
      <div className="flex flex-col md:flex-row p-2 justify-between items-center sticky top-0 bg-secondary z-30">
        <div className="flex items-center">
          <img src={LOGO} alt="Cine Corner Logo" className="w-16 m-2" />
          <h1 className="text-4xl mb-4 pt-4 font-bold">Cine Corner</h1>
        </div>
        {/* <button className="bg-dark text-white dark:bg-light dark:text-black p-2 rounded-md" onClick={() => switchTheme(theme)}>
          <img src={theme === 'light'? MOON : SUN} alt="Theme icon" />
        </button> */}
      </div>
      <Tabs
        tabs={["Popular", "Now Playing", "Top Rated", "Upcoming", "Search"]}
        contents={[
          <PopularMovies />,
          <NowPlaying/>,
          <TopRated/>,
          <Upcoming/>,
          <SearchMovie />,
        ]}
      />
    </div>
  );
};

export default Home;
