import React, {useState, useEffect} from 'react';
import movie_data from './movie_titles.json';
import axios from "axios";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import "./Search.css";

function Search() {
  // defines the use states
  const [movieRecs, setMovieRecs] = useState([]);
  const [individualRec, setIndRecs] = useState("LOADING NOT READY");
  const [movieNum, setMovieNum] = useState(0);
  const [indSummary, setSummary] = useState("");
  const [indRating, setRating] = useState("");
  const [indNumRatings, setNumRatings] = useState("");
  const [moviePosterPath, setMoviePosterPath] = useState("https://ibb.co/0hZXwhp")

  const API = "e9eb1356ad0d34c3167a31807c0ba8f0"


  var count = 0
  useEffect(() => {
    // gets the information the server sends
    axios.get(`https://deepcuts-apps.herokuapp.com/search/${val}`).then(response => {
      console.log(response);
      setMovieRecs(response.data);
      setIndRecs(response.data[0][0])
      setSummary(response.data[0][1]);  
      setRating(response.data[0][2]);  
      setNumRatings(response.data[0][3]);  
      return response.data[0][0].replaceAll(' ', '+');  
        }).then( result => {
          axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${result}`).then(json => {
            return json[Object.keys(json)[0]]['results']['0']['poster_path']
          }).then(poster => {
            setMoviePosterPath(`https://image.tmdb.org/t/p/w500${poster}`)
          })
        })  

 }, []);

 // sets the info based on responses
  var index = -1
  var val = window.location.href.split('/').slice(-1)[0]
  var filteredObj = movie_data.find(function(item, i){
    if(item.movie_id === val){
      index = i;
      return i;
    }
  });
 

  const updateMovieReverse = () => {
    if (movieNum > movieRecs.length){
      setIndRecs("Out of movies :/");
    }
    else{
      setIndRecs(movieRecs[movieNum-1][0]);  
      setSummary(movieRecs[movieNum-1][1]);  
      setRating(movieRecs[movieNum-1][2]);  
      setNumRatings(movieRecs[movieNum-1][3]); 
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${movieRecs[movieNum-1][0].replaceAll(' ', '+')}`).then(json => {
            return json[Object.keys(json)[0]]['results']['0']['poster_path']
          }).then(poster => {
            setMoviePosterPath(`https://image.tmdb.org/t/p/w500${poster}`)
          }) 
  
    } 
    setMovieNum(movieNum -1) 

  };


  // when called, updates the currently dispalyed movie
  const updateMovie = () => {
    if (movieNum > movieRecs.length){
      setIndRecs("Out of movies :/");
    }
    else{
      setIndRecs(movieRecs[movieNum+1][0]);  
      setSummary(movieRecs[movieNum+1][1]);  
      setRating(movieRecs[movieNum+1][2]);  
      setNumRatings(movieRecs[movieNum+1][3]); 
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${movieRecs[movieNum+1][0].replaceAll(' ', '+')}`).then(json => {
            return json[Object.keys(json)[0]]['results']['0']['poster_path']
          }).then(poster => {
            setMoviePosterPath(`https://image.tmdb.org/t/p/w500${poster}`)
          }) 
  
    }
    setMovieNum(movieNum +1) 
  };

 // html dispaly, shows the new movie upon button click.
  return <div className="Search">
    <center>
        <h1 style={{fontSize: "3.7rem", color: 'white', fontFamily: 'Courier New'}}>
          Movies like {movie_data[index]['title']}...
        </h1>     
        <div class = "parent">
          <ArrowBackIosIcon class = "arrowLeft" style={{ fill: "white" }} onClick ={updateMovieReverse}></ArrowBackIosIcon>          
          <img class = "poster" src= {moviePosterPath}  width="350" height="500"/>
          <h3 class = "summary"> {indSummary} </h3>
          <a class = "title"> <h2> {individualRec} </h2> </a>
          <h3 class = "rating"> {indRating}/5 with {indNumRatings} reviews</h3>
          <ArrowForwardIosIcon class = "arrowRight" style={{ fill: "white" }} onClick ={updateMovie}></ArrowForwardIosIcon>          
          <div></div>
        </div>  
    </center>
  </div>;
  }
  
  export default Search;