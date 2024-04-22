import React, {useState, useEffect} from "react";
import star from "../../assets/blackstar.svg";
import { Link } from 'react-router-dom'
import Heart from "react-animated-heart";
import styles from "./SpaceTile.module.css"
import { useNavigate } from "react-router-dom";

const SpaceTile = ({details, style, path, favorites}) => {
    const navigate = useNavigate();
    let nameToDisplay = ""

    const [click, setClick] = useState(false);

    if (details.name.length > 17) {
        nameToDisplay = details.name.slice(0,17) + "..";
    }
    else {
        nameToDisplay = details.name;
    }

    const handleFavorites = async () => {
        if (!click) {
            try {
                const response = await fetch(`http://localhost:5005/user/fav-space/add/${details.id}`, {
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
                const response = await fetch(`http://localhost:5005/user/fav-space/del/${details.id}`, {
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

    useEffect(() => {
        favorites.forEach((item) => {
            if (item.space_id === details.id) {
                setClick(true);
                return;
            }
        });
    }, []);
    
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
                    <p style={{margin: 0, color:"black", fontSize:"1rem" }}>{details.miles} miles away</p>
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