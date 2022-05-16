import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
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
    navigate(`/deepcutsapp/${match.movie_id}`);
  }

  return (
    <Grid container style={{ minHeight: "100vh" }}>
      <Grid item xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={logo} className="photo" alt="Logo" />
      </Grid>
      <Grid item xs={12}>
        <Typography className='title' variant="header2" style={{ fontSize: "3.7rem", fontFamily: "Segoe UI", color: "white" }}>Watch a Movie Like....</Typography>
        <SearchBar label="movie-search-bar" placeholder="Enter a movie!" data={[...new Set(movies.map(movie => movie.title))]} onSearch={handleSearch} />
      </Grid>
    </Grid >
  )
}

export default Home;