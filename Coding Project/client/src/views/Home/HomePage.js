import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import SpaceTile from '../../components/SpaceTile/SpaceTile';
import NavBar from '../../components/NavBar/NavBar';
import Searchbar from '../../components/SearchBar/Searchbar';
import Dropdown from '../../components/Dropdown/Dropdown';

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
            const response = await fetch('http://localhost:5005/v1/user', {
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
            console.log(res)
            const updatedSpaceData = res.data[0];

            setSpaceData(updatedSpaceData);

        } catch (error) {
            console.error(error);
            navigate('/log-in');
        }
    };

    const handleSortFilterChange = async (option) => {
        let endpoint = ''; // Define endpoint based on the selected option

        if (option === 'A-Z') {
            endpoint = 'http://localhost:5005/space/alphabetical-order/sort?order=asc';
        } else if (option === 'Z-A') {
            endpoint = 'http://localhost:5005/space/alphabetical-order/sort?order=desc';
        } else if (option === 'distance: nearest first') {
          endpoint = 'http://localhost:5005/space/sort?lat=41.8720&lon=-87.6479';
        } else if (option === 'distance: furthest first') {
          endpoint = 'http://localhost:5005/space/sort?lat=40.7061&lon=-74.0089';
        } else if (option === 'ratings: highest first') {
          endpoint = 'http://localhost:5005/space/overall-ratings/sort?order=desc';
        } else if (option === 'ratings: lowest first') {
          endpoint = 'http://localhost:5005/space/overall-ratings/sort?order=asc';
        }

        try {
          const response = await fetch(endpoint, {
              method: 'GET',
              credentials: 'include',
          });

          const res = await response.json();

          if(option !== 'distance: furthest first' && option !== 'distance: nearest first') {
            console.log(res)
            setSpaceData(res.spaces);
          } else {
            console.log(res)
            setSpaceData(res.data[0]);
          }


      } catch (error) {
          console.error(error);
          navigate('/log-in');
      }
    };

    useEffect(() => {
        checkAuth();
        getSpaces('http://localhost:5005/space/all-spaces');
    }, []);

    require('./HomePage.css');
    const sortbyOptions = ['A-Z', 'Z-A', 'distance: nearest first', 'distance: furthest first', 'ratings: highest first', 'ratings: lowest first'];
    const filterbyOptions = ['amenities', 'tags', 'favorites'];

    return (
        <div className='menu-page'>
            <NavBar info={userData} page="home" />

            <div className='right-side-menu' style={{ marginLeft: "20vw"}}>
                
                <Searchbar />
                <div className='sort-and-filter'>
                    <Dropdown drop={{ feature: "sort by ▼", options: sortbyOptions }} onChange={handleSortFilterChange} />
                    <Dropdown drop={{ feature: "filter by ▼", options: filterbyOptions }} />
                </div>
                
                <hr width="90%" size="2" />

                <div className='spacetiles-container'>
                    {spaceData && spaceData.map((item, index) => (
                        <SpaceTile key={index} details={{ img: item.img, name: item.name, miles: "< 5 miles", rating: item.rating }} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
