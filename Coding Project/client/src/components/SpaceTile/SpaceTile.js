import React, {useState} from "react";
import studySpace from "../../assets/studyspace.svg";
import star from "../../assets/blackstar.svg";
import { Link } from 'react-router-dom'
import Heart from "react-animated-heart";
import styles from "./SpaceTile.module.css"

const SpaceTile = ({details, style, path}) => {
    let nameToDisplay = ""

    const [isClick, setClick] = useState(false);
    if (details.name.length > 17) {
        nameToDisplay = details.name.slice(0,17) + "..";
    }
    else {
        nameToDisplay = details.name;
    }
    
    return (
        <div className={styles['space-tile']} style={{style}}>
            <Heart isClick={isClick} onClick={() => setClick(!isClick)} styles={{position:"absolute", right:"-12px", top:"-12px", }} />

            <Link to = {path} style={{ textDecoration: 'none' }}>
            <div className={styles['spacetile-image']} >
                <img src={(details.img === undefined ? studySpace : details.img)} alt = "" style={{width:"100%", objectFit: "cover"}}/>
            </div>
            <div className={styles['spacetile-summary']}> 
                <div className={styles['spacetile-info']}>
                    <p style={{margin: 0, color: "black", fontSize:"1.5rem", textOverflow: "ellipsis",}}>{(details.name === undefined? "N/A" : nameToDisplay)}</p>
                    <p style={{margin: 0, color:"black", fontSize:"1rem" }}>{details.miles} miles away</p>
                </div>
                <div className={styles['spacetile-rating']} >
                    <img className={styles['tile-rating']} src={star} alt = ""/>
                    <p className={styles['tile-rating']} style={{color: "black", fontSize:"1.5rem"}}>{(details.rating === undefined? "N/A" : details.rating)}</p>
                </div>
            </div>

            </Link>
        </div>
    );
}

export default SpaceTile;