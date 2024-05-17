import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import SpaceTile from '../../components/SpaceTile/SpaceTile';
import NavBar from '../../components/NavBar/NavBar';
import Searchbar from '../../components/SearchBar/Searchbar';
import Dropdown from '../../components/Dropdown/Dropdown';
import styles from './Home.module.css';
import Button from '../../components/Button/Button';
import Location from '../../components/Location/Location';


const HomePage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: ''
    });
    const [userFavorites, setUserFavorites] = useState([]);
    const [userLocation, setUserLocation] = useState({
        lat:41.8686,
        long:-87.6484
    });
    const [spaceData, setSpaceData] = useState([]);
    const [accessClick, setAccessClick] = useState(false);

    const checkAuth = async () => {
        try {
            const response = await fetch('http://api.silentspaces.olympicene.dev/auth/user', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Auth failed');
            }

            const res = await response.json();

            //console.log(res)

            const updatedUserData = {
                first_name: res.data[0].first_name,
                last_name: res.data[0].last_name,
                email: res.data[0].email
            };

            setUserData(updatedUserData);
            setUserFavorites(res.data[0].favorite_spaces)

        } catch (error) {
            console.error(error);
            navigate('/log-in');
        }
    };

    const getSpaces = async (endpoint) => {
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Auth failed');
            }

            const res = await response.json();
            //console.log(res.data[0])
            const updatedSpaceData = res.data;

            setSpaceData(updatedSpaceData);

        } catch (error) {
            console.error(error);
            navigate('/log-in');
        }
    };

    const handleSortChange = async (option) => {
        let endpoint = ''; // Define endpoint based on the selected option

        if (option === 'A-Z') {
            endpoint = 'http://api.silentspaces.olympicene.dev/space/sort/alphabetical-order?order=asc';
        } else if (option === 'Z-A') {
            endpoint = 'http://api.silentspaces.olympicene.dev/space/sort/alphabetical-order?order=desc';
        } else if (option === 'distance: nearest first') {
          endpoint = 'http://api.silentspaces.olympicene.dev/space/sort/proximity?lat=41.8720&lon=-87.6479';
        } else if (option === 'distance: furthest first') {
          endpoint = 'http://api.silentspaces.olympicene.dev/space/sort/proximity?lat=41.8720&lon=-87.6479';
        } else if (option === 'ratings: highest first') {
          endpoint = 'http://api.silentspaces.olympicene.dev/space/sort/overall-ratings?order=desc';
        } else if (option === 'ratings: lowest first') {
          endpoint = 'http://api.silentspaces.olympicene.dev/space/sort/overall-ratings?order=asc';
        }

        try {
          const response = await fetch(endpoint, {
              method: 'GET',
              credentials: 'include',
          });

        setSpaceData([]);
        const res = await response.json();
        setSpaceData(res.data);
          

      } catch (error) {
          console.error(error);
          navigate('/log-in');
      }
    };

    const handleSearch = async (searchInput) => {
        try {
            const response = await fetch("http://api.silentspaces.olympicene.dev/space/search", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                  "name": searchInput,
                })
            });
    
            if (!response.ok) {
                console.log("error")
            }
            setSpaceData([]);
            const res = await response.json();
            setSpaceData(res.data);
            } catch (error) {
            console.error(error);
            navigate('/log-in');
        }
    }

    const handleFilterChange = async (option) => {
        let endpoint = ''; // Define endpoint based on the selected option

        if (option === 'outlets') {
            endpoint = 'http://api.silentspaces.olympicene.dev/space/filter/amenities?has_outlets=true';
        } else if (option === 'whiteboards') {
            endpoint = 'http://api.silentspaces.olympicene.dev/space/filter/amenities?has_whiteboards=true';
        } else if (option === 'screen') {
            endpoint = 'http://api.silentspaces.olympicene.dev/space/filter/amenities?has_screen=true';
        } else if (option === 'food & beverage') {
            endpoint = 'http://api.silentspaces.olympicene.dev/space/filter/amenities?is_food_beverage_friendly=true';
        } else if (option === 'printers') {
            endpoint = 'http://api.silentspaces.olympicene.dev/space/filter/amenities?has_printer=true';
        } else if (option === 'breakout rooms') {
            endpoint = 'http://api.silentspaces.olympicene.dev/space/filter/amenities?has_breakout_rooms=true';
        } else if (option === 'restrooms') {
            endpoint = 'http://api.silentspaces.olympicene.dev/space/filter/amenities?restrooms=true';
        } else if (option === 'group seating') {
            endpoint = 'http://api.silentspaces.olympicene.dev/space/filter/amenities?seating_type=group-seating';
        } else if (option === 'individual seating') {
            endpoint = 'http://api.silentspaces.olympicene.dev/space/filter/amenities?seating_type=individual-seating';
        } else if (option === 'clear filters') {
            endpoint = 'http://api.silentspaces.olympicene.dev/space/all-spaces';
        }

        try {
          const response = await fetch(endpoint, {
              method: 'GET',
              credentials: 'include',
          });
        
        setSpaceData([]);
        const res = await response.json();
        setSpaceData(res.data);
          
      } catch (error) {
          console.error(error);
          navigate('/log-in');
      }
    };

    const handleLocationChange = (location) => {
        setUserLocation(location);
    };

    useEffect(() => {
        checkAuth();
        getSpaces('http://api.silentspaces.olympicene.dev/space/all-spaces');
    }, [userLocation]);

    const sortbyOptions = ['A-Z', 'Z-A', 'distance: nearest first', 'distance: furthest first', 'ratings: highest first', 'ratings: lowest first'];
    const filterbyOptions = ['outlets', 'whiteboards', 'screen', 'food & beverage', 'printers', 'breakout rooms', 'restrooms', 'group seating', 'individual seating', 'clear filters'];
    console.log(userLocation)
    return (
        <div className={styles['menu-page']}>
            <NavBar info={userData} page="home" />

            <div className={styles['right-side-menu']} style={{ marginLeft: "20vw"}}>
                <Searchbar style={{width:"100%"}} onChange={handleSearch}/>
                
                <div className={styles['sort-and-filter']}>
                    <button className={styles['home-loc-button']} onClick={()=>setAccessClick(!accessClick)}>access location</button>
                    {accessClick && <Location onLocationChange={handleLocationChange}/>}
                    <div style={{display:"flex"}}>
                        <Dropdown drop={{ feature: "sort by ▼", options: sortbyOptions }} onChange={handleSortChange} />
                        <Dropdown drop={{ feature: "filter by ▼", options: filterbyOptions }} onChange={handleFilterChange} />
                    </div>
                </div>

                <hr width="90%" size="2" />

                <div className={styles['spacetiles-container']}>
                    {spaceData && spaceData.map((item, index) => (
                        <div className={styles['spacetile']}>
                            <SpaceTile path={`/spaces/${item.id}`} key={index} details={{ img: item.img, name: item.name, lat: item.location.coordinates[0], long:item.location.coordinates[1], rating: item.rating, id:item.id}} coords = {userLocation} favorites={userFavorites} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
