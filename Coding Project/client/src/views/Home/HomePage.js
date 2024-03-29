import React, { useEffect, useState } from 'react';
import { ReactComponent as MapIcon } from "../../assets/locationIcon.svg";
import { ReactComponent as ListIcon } from "../../assets/clipboardIcon.svg";
import { ReactComponent as Border } from '../../assets/abstractBookshelf.svg';
import { useNavigate } from "react-router-dom";
import SpaceTile from '../../components/SpaceTile/SpaceTile';
import NavBar from '../../components/NavBar/NavBar';
import Searchbar from '../../components/SearchBar/Searchbar';


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
    return (
        // <div className="menu-container">
        //     {/* <Border className="left-border" />
        //     <Border className="right-border" /> */}
        //     <div>
        //         <h1 style={{ color: 'white' }}>Hi User</h1>
        //         <div className="subsection">
        //             <h2 style={{ color: 'white' }}>Find a Space</h2>
        //             <div className="buttons-container">
        //                 <button style={{ backgroundColor: '#69B578' }}>
        //                     <MapIcon className="icon" />
        //                     <span>Find using Location</span>
        //                 </button>
        //                 <button style={{ backgroundColor: '#3A7D44' }}>
        //                     <ListIcon className="icon" />
        //                     <span>Find from a List</span>
        //                 </button>
        //             </div>
        //         </div>
        //         <h2 style={{ color: 'white' }}>Your Information</h2>
        //         <div className="buttons-container">
        //             <button style={{ backgroundColor: '#3A7D44', width: '225px' }}>
        //                 Favorite Spaces
        //             </button>
        //             <button style={{ backgroundColor: '#D9D9D9', width: '225px', color: 'black' }}>
        //                 Settings
        //             </button>
        //         </div>
        //     </div>
        <div className='menu-page'>
          <NavBar/>
          <div className='right-side-menu' style={{marginLeft : "20vw"}}>
            <Searchbar/>
            <div className='spacetiles-container'>
              <SpaceTile details={{name:"name", miles:"0.4", rating:"4.3"}} />
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