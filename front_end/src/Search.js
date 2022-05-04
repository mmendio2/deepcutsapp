import React, {useState, useEffect} from 'react';
import movie_data from './movie_titles.json'
import axios from "axios"
import "./Search.css";
import { setNodeSourceCodeLocation } from 'parse5/lib/tree-adapters/default';


function Search() {
  // defines the use states
  const [movieRecs, setMovieRecs] = useState([]);
  const [individualRec, setIndRecs] = useState("LOADING NOT READY");
  const [movieNum, setMovieNum] = useState(1);
  const [indSummary, setSummary] = useState("");
  const [indRating, setRating] = useState("");
  const [indNumRatings, setNumRatings] = useState("");


  var count = 0
  useEffect(() => {
    // gets the information the server sends
    axios.get(`/search/${val}`).then(response => {
      console.log(response);
      setMovieRecs(response.data);
      setIndRecs(response.data[0][0])
      setSummary(response.data[0][1]);  
      setRating(response.data[0][2]);  
      setNumRatings(response.data[0][3]);  
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
 
  const movie = movie_data[index]['title']


  // when called, updates the currently dispalyed movie
  const updateMovie = () => {
    if (movieNum > movieRecs.length){
      setIndRecs("Out of movies :/");
    }
    else{
      setMovieNum(movieNum+1);
      setIndRecs(movieRecs[movieNum][0]);  
      setSummary(movieRecs[movieNum][1]);  
      setRating(movieRecs[movieNum][2]);  
      setNumRatings(movieRecs[movieNum][3]);  
    } 
  };

 // html dispaly, shows the new movie upon button click.
  return <div className="Search">
    <center>
        <h1 style={{fontSize: "3.7rem"}}>
          Movies like {movie}...
        </h1>     
        <a> <h2> {individualRec} </h2> </a>
        <h3> {indSummary} </h3>
        <h3> {indRating}/5 with {indNumRatings} reviews</h3>
        <button onClick ={updateMovie}>GET NEW MOVIE</button>
    </center>
  </div>;
  }
  
  
  export default Search;