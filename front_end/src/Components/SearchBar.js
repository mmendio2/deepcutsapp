import React, {useState} from 'react';
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {BrowserRouter as Router, Link} from 'react-router-dom';


function SearchBar({placeholder, data}) {

    // 

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");


    const handleFilter = (event) => {
        const searchWord = event.target.value.toString().toLowerCase();
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.title.toString().toLowerCase().includes(searchWord);
        });
        if (searchWord === "") {
            setFilteredData([]);
        }
        else{
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    }


    // html ouput
    return (
        <div className="search">
            <div className="searchInputs">
                <input type ="text" placeholder ={placeholder} value = {wordEntered} onChange={handleFilter}/>
                <div className ="searchIcon">
                    {filteredData.length === 0 ? <SearchIcon/> : (
                    // if length, is zero -> search icon, if length isn't -> x-button, which gets read of any typed button in the input
                    <CloseIcon id="clearBtn" onClick = {clearInput}/> 
                    )}
                </div>
            </div>
            {filteredData.length !== 0 &&(
                <div className="dataResult" >
                    {filteredData.slice(0, 15).map((value, key) => {
                        return (
                        <Link className = "dataItem" to = {`/deepcutsapp/${value.movie_id}`}> 
                            <p>
                                {value.title} 
                            </p>
                        </Link>
                        );
                    })} 

                </div>   
              )} 
        </div>
    );
}

export default SearchBar 