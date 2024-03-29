import React, {useState, useEffect} from 'react'
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };

    useEffect (() => {
        adjustFontSize()
    }, [searchInput])

    const adjustFontSize = () => {
        const fontsize = 1.9 - searchInput.length*0.05
        document.getElementById('searchbar-input').style.fontSize = '1.5rem'
    }

    require('./Searchbar.css')
    return (
        <div className='searchbar'>
                <input
                    id='searchbar-input'
                    className='searchbar-input'
                    type="search"
                    placeholder="search for spaces"
                    onChange={handleChange}
                    value={searchInput} />
                <button>
                    <FaSearch style={{paddingRight:"10px", fontSize:"1.5rem", paddingTop:"10px"}}/>
                    search
                </button>
        </div>
    )
}

export default Searchbar
