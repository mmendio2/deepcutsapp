import { useNavigate } from "react-router-dom";
import SearchBar from "./Components/SearchBar";
import logo from "./DeepCuts_Logo.png";
import "./Home.css";
import movies from "./movie_titles.json";

// displays logo, text, and search bar
function Home() {

  const navigate = useNavigate();

  function handleSearch(movieTitle) {
    const match = movies.find(movie => movie.title === movieTitle);
    navigate(`/deepcuts/${match.movie_id}`);
  }

  return (
    <div>
      <img src={logo} className="photo" alt="Logo" />
      <center>
        <h1 style={{ fontSize: "3.7rem", fontFamily: "Segoe UI", color: "white" }}>
          Watch a Movie Like....
        </h1>
      </center>
      <SearchBar label="movie-search-bar" placeholder="Enter a movie!" data={[...new Set(movies.map(movie => movie.title))]} onSearch={handleSearch} />
    </div>
  )
}

export default Home;