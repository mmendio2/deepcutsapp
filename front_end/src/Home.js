import React, {useState} from 'react';
import SearchBar from "./Components/SearchBar";
import logo from "./DeepCuts_Logo.png";
import MovieData from "./movie_titles.json";
import "./Home.css";

// displays logo, text, and search bar
function Home() {
return(
    <div>
        <img src={logo} className = "photo" alt="Logo" />
        <center>
            <h1 style={{fontSize: "3.7rem", fontFamily: "Courier New",  color: "white"}}>
                Watch a Movie Like v.3....
            </h1>
        </center>
        <SearchBar placeholder = "Enter a movie!" data ={MovieData}/>
    </div>
    )
}

export default Home;