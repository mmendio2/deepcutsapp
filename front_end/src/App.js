import React from "react";
import "./App.css";
import Search from "./Search.js";
import Home from "./Home.js"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// sets the webapge url for home page and redirects after a search
function App() {
    return (
      <Router>
        <div className="App">
            <div className = "content">
              <Routes>
                <Route path ='/deepcuts' element={<Home/>}/> 
                <Route path ='/deepcuts/*' element={<Search/>}/> 
              </Routes>
            </div>
        </div>
      </Router>
    
    )
}


export default App;
