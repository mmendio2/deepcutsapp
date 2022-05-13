import "./App.css";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Home.js";
import Search from "./Search.js";

// sets the webapge url for home page and redirects after a search
function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path='/deepcuts' element={<Home />} />
            <Route path='/deepcuts/*' element={<Search />} />
          </Routes>
        </div>
      </div>
    </Router>

  )
}


export default App;
