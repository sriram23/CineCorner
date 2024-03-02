import PopularMovies from "../../components/molecules/popular-movies";
import SearchMovie from "../../components/molecules/search-movie";
import Tabs from "../../components/tabs";
import './home.css'
const Home = () => {
  return (
    <div className="home-container">
      <div className="flex flex-col md:flex-row p-2 justify-between items-center">
        <h1 className="text-4xl mb-4 pt-4 font-bold">Cine Corner</h1>
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
