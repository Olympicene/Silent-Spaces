import React, {useState, useEffect} from "react";
import star from "../../assets/blackstar.svg";
import { Link } from 'react-router-dom'
import Heart from "react-animated-heart";
import styles from "./SpaceTile.module.css"
import { useNavigate } from "react-router-dom";


const SpaceTile = ({details, style, path, favorites, coords}) => {
    const navigate = useNavigate();
    let nameToDisplay = ""

    const [click, setClick] = useState(false);
    const [miles, setMiles] = useState(0);
    console.log(coords)
    if (details.name.length > 17) {
        nameToDisplay = details.name.slice(0,17) + "..";
    }
    else {
        nameToDisplay = details.name;
    }

    const handleFavorites = async () => {
        if (!click) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/user/fav-space/add/${details.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    console.log("error")
                    }
                  setClick(true)
            
                } catch (error) {
                console.error(error);
                navigate('/log-in');
            }
        }
        else {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/user/fav-space/del/${details.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    console.log("error")
                    }
                console.log('deleted')
                setClick(false)
            
                } catch (error) {
                console.error(error);
                navigate('/log-in');
            }
        }
    }

    function haversineDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        console.log(lat1, lon1, lat2, lon2)
        const earthRadiusMiles = 3958.8; // Radius of the Earth in miles
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadiusMiles * c;
        console.log(distance)
        return distance.toFixed(2);
      }
    
    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    useEffect(() => {
        favorites.forEach((item) => {
            if (item.space_id === details.id) {
                setClick(true);
                return;
            }
        });
        setMiles(haversineDistanceBetweenPoints(coords.lat, coords.long, details.long, details.lat))
    }, [miles]);
    
    return (
        <div className={styles['space-tile']} style={{style}}>
            <Heart isClick={click} onClick={handleFavorites} styles={{position:"absolute", right:"-12px", top:"-12px", }} />

            <Link to = {path} style={{ textDecoration: 'none' }}>
            <div className={styles['spacetile-image']} >
                <img src={(details.img[0] || details.img)} alt = "" style={{width:"100%", objectFit: "cover"}}/>
            </div>
            <div className={styles['spacetile-summary']}> 
                <div className={styles['spacetile-info']}>
                    <p style={{margin: 0, color: "black", fontSize:"1.5rem", textOverflow: "ellipsis",}}>{(details.name === undefined? "N/A" : nameToDisplay)}</p>
                    <p style={{margin: 0, color:"black", fontSize:"1rem" }}>{miles} miles away</p>
                </div>
                <div className={styles['spacetile-rating']} >
                    <img className={styles['tile-rating']} src={star} alt = ""/>
                    <p className={styles['tile-rating']} style={{color: "black", fontSize:"1.5rem"}}>{(details.rating === undefined? "N/A" : details.rating.toFixed(1))}</p>
                </div>
            </div>

            </Link>
        </div>
    );
}

export default SpaceTile;