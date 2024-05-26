import FavoriteTile from '../../components/FavoriteTile/FavoriteTile';
import NavBar from '../../components/NavBar/NavBar';
import styles from './FavoritesPage.module.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const FavoritesPage = () => {
    const navigate = useNavigate();

    const dummyuser = {
        first_name: 'Kevin',
        last_name: 'Cordero',
        email: 'thing@gmail.com',
    }

    const [favData, setFavData] = useState([]);

    const getFavSpaces = async (endpoint) => {
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Auth failed');
            }

            const res = await response.json();
            const updatedFavData = res.data;

            setFavData(updatedFavData);

        } catch (error) {
            console.error(error);
            navigate('/log-in');
        }
    };

    useEffect(() => {
        getFavSpaces(`${process.env.REACT_APP_API_URL}/user/fav-space/all`);
    }, []);

    return (
        <div className={styles['favorites-main']}>
            <NavBar info={dummyuser} page="favorites" />
            <div className={styles['favorites-right']}>
                <h1 className={styles['favorites-title']}>FAVORITE SPACES</h1>
                {favData && favData.map((item, index) => (
                    <FavoriteTile path={`/spaces/${item.id}`} key={index} data={item} /> 
                ))}
            </div>
        </div>
    );
}

export default FavoritesPage;