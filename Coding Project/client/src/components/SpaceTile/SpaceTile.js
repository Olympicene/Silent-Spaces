import React from "react";
import studySpace from "../../assets/studyspace.svg";
import star from "../../assets/blackstar.svg";
import './SpaceTile.css';
import { Link } from 'react-router-dom'


const SpaceTile = ({details}) => {
    return (
        <div className="space-tile">
            <Link to = {details.path}>
            <img src={studySpace} alt = "" style={{width:"100%", objectFit: "cover"}}/>
            {/* <span class="material-icons-outlined">favorite_border</span> */}
            <div style={{float:"left"}}>
                <p style={{color: "black", fontSize:"1.5rem", margin:"0"}}>{details.name}</p>
                <p style={{color:"#595A5E", fontSize:"1rem", margin:"0"}}>{details.miles} miles away</p>
            </div>
            <div style={{float:"right"}}>
                <img className="tile-rating" src={star} alt = ""/>
                <p className="tile-rating" style={{color: "black", fontSize:"1.5rem"}}>{details.rating}</p>
            </div>
            </Link>
        </div>
    );
}

export default SpaceTile;