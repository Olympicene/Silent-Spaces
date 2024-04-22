import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import SpaceTile from '../../components/SpaceTile/SpaceTile';
import NavBar from '../../components/NavBar/NavBar';
import Searchbar from '../../components/SearchBar/Searchbar';
import Dropdown from '../../components/Dropdown/Dropdown';
import styles from './Home.module.css';


const HomePage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
    });

    const [spaceData, setSpaceData] = useState([]);

    const checkAuth = async () => {
        try {
            const response = await fetch('http://localhost:5005/auth/user', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Auth failed');
            }

            const res = await response.json();

            console.log(res)

            const updatedUserData = {
                first_name: res.data[0].first_name,
                last_name: res.data[0].last_name,
                email: res.data[0].email,
            };

            setUserData(updatedUserData);

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
            console.log(res.data[0])
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
            endpoint = 'http://localhost:5005/space/sort/alphabetical-order?order=asc';
        } else if (option === 'Z-A') {
            endpoint = 'http://localhost:5005/space/sort/alphabetical-order?order=desc';
        } else if (option === 'distance: nearest first') {
          endpoint = 'http://localhost:5005/space/sort/proximity?lat=41.8720&lon=-87.6479';
        } else if (option === 'distance: furthest first') {
          endpoint = 'http://localhost:5005/space/sort/proximity?lat=41.8720&lon=-87.6479';
        } else if (option === 'ratings: highest first') {
          endpoint = 'http://localhost:5005/space/sort/overall-ratings?order=desc';
        } else if (option === 'ratings: lowest first') {
          endpoint = 'http://localhost:5005/space/sort/overall-ratings?order=asc';
        }

        try {
          const response = await fetch(endpoint, {
              method: 'GET',
              credentials: 'include',
          });

        const res = await response.json();
        setSpaceData(res.data);
          

      } catch (error) {
          console.error(error);
          navigate('/log-in');
      }
    };

    const handleFilterChange = async (option) => {
        let endpoint = ''; // Define endpoint based on the selected option

        if (option === 'outlets') {
            endpoint = 'http://localhost:5005/space/filter/amenities?has_outlets=true';
        } else if (option === 'whiteboards') {
            endpoint = 'http://localhost:5005/space/filter/amenities?has_whiteboards=true';
        } else if (option === 'screen') {
            endpoint = 'http://localhost:5005/space/filter/amenities?has_screen=true';
        } else if (option === 'food & beverage') {
            endpoint = 'http://localhost:5005/space/filter/amenities?is_food_beverage_friendly=true';
        } else if (option === 'printers') {
            endpoint = 'http://localhost:5005/space/filter/amenities?has_printer=true';
        } else if (option === 'breakout rooms') {
            endpoint = 'http://localhost:5005/space/filter/amenities?has_breakout_rooms=true';
        } else if (option === 'restrooms') {
            endpoint = 'http://localhost:5005/space/filter/amenities?restrooms=true';
        } else if (option === 'group seating') {
            endpoint = 'http://localhost:5005/space/filter/amenities?seating_type=group-seating';
        } else if (option === 'individual seating') {
            endpoint = 'http://localhost:5005/space/filter/amenities?seating_type=individual-seating';
        } else if (option === 'clear filters') {
            endpoint = 'http://localhost:5005/space/all-spaces';
        }

        try {
          const response = await fetch(endpoint, {
              method: 'GET',
              credentials: 'include',
          });

        const res = await response.json();
        setSpaceData(res.data);
          
      } catch (error) {
          console.error(error);
          navigate('/log-in');
      }
    };

    useEffect(() => {
        checkAuth();
        getSpaces('http://localhost:5005/space/all-spaces');
    }, []);

    const sortbyOptions = ['A-Z', 'Z-A', 'distance: nearest first', 'distance: furthest first', 'ratings: highest first', 'ratings: lowest first'];
    const filterbyOptions = ['outlets', 'whiteboards', 'screen', 'food & beverage', 'printers', 'breakout rooms', 'restrooms', 'group seating', 'individual seating', 'clear filters'];

    return (
        <div className={styles['menu-page']}>
            <NavBar info={userData} page="home" />

            <div className={styles['right-side-menu']} style={{ marginLeft: "20vw"}}>

                <Searchbar />
                <div className={styles['sort-and-filter']}>
                    <Dropdown drop={{ feature: "sort by ▼", options: sortbyOptions }} onChange={handleSortChange} />
                    <Dropdown drop={{ feature: "filter by ▼", options: filterbyOptions }} onChange={handleFilterChange} />
                </div>

                <hr width="90%" size="2" />

                <div className={styles['spacetiles-container']}>
                    {spaceData && spaceData.map((item, index) => (
                        <div className={styles['spacetile']}>
                            <SpaceTile path={`/spaces/${item.id}`} key={index} details={{ img: item.img, name: item.name, miles: "< 5 miles", rating: item.rating, id:item.id }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
