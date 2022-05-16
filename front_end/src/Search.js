import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { useEffect, useState } from 'react';
import { getURL } from './env';
import movies from './movie_titles.json';

// import "./Search.css";

function Search() {
  // defines the use states
  const [movieRecs, setMovieRecs] = useState([]);
  const [individualRec, setIndRecs] = useState("LOADING NOT READY");
  const [movieNum, setMovieNum] = useState(0);
  const [indSummary, setSummary] = useState("");
  const [indRating, setRating] = useState("");
  const [indNumRatings, setNumRatings] = useState("");
  const [moviePosterPath, setMoviePosterPath] = useState("https://ibb.co/0hZXwhp")


  // THIS SHOULD 10000% be a environmental variable, but it was complicated and so I gave up, please don't use it for bad things
  const API = "e9eb1356ad0d34c3167a31807c0ba8f0"

  useEffect(() => {
    // gets the information the server sends
    axios.get(`${getURL()}/search/${val}`).then(response => {
      console.log(response);
      setMovieRecs(response.data);
      setIndRecs(response.data[0][0])
      setSummary(response.data[0][1]);
      setRating(response.data[0][2]);
      setNumRatings(response.data[0][3]);
      return response.data[0][0].replaceAll(' ', '+');
    }).then(result => {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${result}`).then(json => {
        return json[Object.keys(json)[0]]['results']['0']['poster_path']
      }).then(poster => {
        setMoviePosterPath(`https://image.tmdb.org/t/p/w500${poster}`)
      })
    })
  });

  // sets the info based on responses
  var val = window.location.href.split('/').slice(-1)[0]
  var index = movies.findIndex(movie => movie.movie_id === val);


  const updateMovieReverse = () => {
    if (movieNum > movieRecs.length) {
      setIndRecs("Out of movies :/");
    }
    else {
      setIndRecs(movieRecs[movieNum - 1][0]);
      setSummary(movieRecs[movieNum - 1][1]);
      setRating(movieRecs[movieNum - 1][2]);
      setNumRatings(movieRecs[movieNum - 1][3]);
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${movieRecs[movieNum - 1][0].replaceAll(' ', '+')}`).then(json => {
        return json[Object.keys(json)[0]]['results']['0']['poster_path']
      }).then(poster => {
        setMoviePosterPath(`https://image.tmdb.org/t/p/w500${poster}`)
      })

    }
    setMovieNum(movieNum - 1)

  };


  // when called, updates the currently dispalyed movie
  const updateMovie = () => {
    if (movieNum > movieRecs.length) {
      setIndRecs("Out of movies :/");
    }
    else {
      setIndRecs(movieRecs[movieNum + 1][0]);
      setSummary(movieRecs[movieNum + 1][1]);
      setRating(movieRecs[movieNum + 1][2]);
      setNumRatings(movieRecs[movieNum + 1][3]);
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${movieRecs[movieNum + 1][0].replaceAll(' ', '+')}`).then(json => {
        return json[Object.keys(json)[0]]['results']['0']['poster_path']
      }).then(poster => {
        setMoviePosterPath(`https://image.tmdb.org/t/p/w500${poster}`)
      })

    }
    setMovieNum(movieNum + 1)
  };

  // html dispaly, shows the new movie upon button click.
  return (
    <Grid container style={{ minHeight: "100vh" }}>
      <Grid item xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h1 style={{ fontSize: "3.7rem", color: 'white', fontFamily: 'Segoe UI' }}>
          Movies like {movies[index]['title']}...
        </h1>
      </Grid>
      <Grid item xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Stack
          alignItems="center"
          justifyContent="center"
          direction="row"
          spacing={2}
        >
          <IconButton aria-label="Clear search field" onClick={updateMovieReverse} style={{ color: "white" }}>
            <ArrowBackIosIcon />
          </IconButton>
          <img className="poster" alt="movie poster" src={moviePosterPath} width="350" height="500" />
          <Typography className='title' variant="header3" style={{ fontFamily: "Segoe UI", color: "white" }}>{indSummary}</Typography>
          <Typography className='title' variant="header2" style={{ fontFamily: "Segoe UI", color: "white" }}>{individualRec}</Typography>
          <Typography className='title' variant="header3" style={{ fontFamily: "Segoe UI", color: "white" }}>{indRating}/5 ({indNumRatings} Reviews)</Typography>
          <IconButton aria-label="Clear search field" onClick={updateMovie} style={{ color: "white" }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Stack >
      </Grid>
    </Grid>
  );
}

export default Search;