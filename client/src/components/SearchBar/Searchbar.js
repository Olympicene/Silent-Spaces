import React, {useState, useEffect} from 'react'
import { FaSearch } from "react-icons/fa";
import styles from "./Searchbar.module.css"
import Button from '../Button/Button';
import { useNavigate } from "react-router-dom";


const Searchbar = ({onChange}) => {
    const navigate = useNavigate();

    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };

    const handleSearchSelect = () => {
        onChange(searchInput)
    }

    useEffect (() => {
        adjustFontSize()
    }, [searchInput])

    const adjustFontSize = () => {
        const fontsize = 1.9 - searchInput.length*0.05
        document.getElementById('searchbar-input').style.fontSize = '1.5rem'
    }

    return (
        <div className={styles['searchbar']}>
                <input
                    id='searchbar-input'
                    className={styles['searchbar-input']}
                    type="search"
                    placeholder="search for spaces"
                    onChange={handleChange}
                    value={searchInput} />
                <Button theme="contrast" style={{ padding:"1rem"}} onClick={handleSearchSelect}>
                    <div style={{display:"flex", gap:"0.5rem"}}>
                    <FaSearch style={{fontSize:"2rem", marginTop:"0.5rem"}}/>
                    search
                    </div>
                </Button>
        </div>
    )
}

export default Searchbar
