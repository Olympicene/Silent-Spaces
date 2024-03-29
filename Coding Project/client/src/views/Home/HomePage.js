import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import SpaceTile from '../../components/SpaceTile/SpaceTile';
import NavBar from '../../components/NavBar/NavBar';
import Searchbar from '../../components/SearchBar/Searchbar';
import Dropdown from '../../components/Dropdown/Dropdown';


const MenuPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
      });

    const checkAuth = async () => {
      
      try {
        const response = await fetch('http://localhost:5005/v1/user', {
          method: 'GET',
        });
  
        console.log(response)

        if (!response.ok) {

          throw new Error('Auth failed');
        }
  
        const data = await response.json();
        return data.body

      } catch (error) {
        console.error(error)
      }
    };

    useEffect(()=>{
        checkAuth()
        .then(
            data => setUserData
        )
    },[]);

    require('./HomePage.css')
    const sortbyOptions = ['A-Z', 'Z-A', 'distance: nearest first', 'distance: furthest first', 'ratings: highest first', 'ratings: lowest first'];
    const filterbyOptions = ['amenities', 'tags', 'favorites'];

    return (
        
        <div className='menu-page'>
          <NavBar/>

          <div className='right-side-menu' style={{marginLeft : "20vw"}}>
            <Searchbar/>
            <div className='sort-and-filter'> 
              <Dropdown drop={{feature:"sort by ▼", options:sortbyOptions}}/>
              <Dropdown drop={{feature:"filter by ▼", options:filterbyOptions}}/>
            </div>
            <hr width="90%" size="2"/>
            <div className='spacetiles-container'>
              <SpaceTile details={{name:"name", miles:"0.4", rating:"4.3", path:"/log-in"}} />
              <SpaceTile details={{name:"name", miles:"0.4", rating:"4.3"}} />
              <SpaceTile details={{name:"name", miles:"0.4", rating:"4.3"}} />
              <SpaceTile details={{name:"name", miles:"0.4", rating:"4.3"}} />
              <SpaceTile details={{name:"name", miles:"0.4", rating:"4.3"}} />
              <SpaceTile details={{name:"name", miles:"0.4", rating:"4.3"}} />
            </div>

          </div>
        </div>  
            
        // </div>
    );
};

export default MenuPage;