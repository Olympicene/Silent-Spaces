import React from "react";
import studySpace from "../assets/studyspace.svg";
import star from "../assets/blackstar.svg";

const SpaceTile = ({details}) => {
    return (
        <div className="space-tile">
            <img src={studySpace} alt = "" style={{width:"100%", objectFit: "cover"}}/>
            {/* <span class="material-icons-outlined">favorite_border</span> */}
            <div style={{float:"left"}}>
                <p style={{fontSize:"1.5rem", margin:"0"}}>{details.name}</p>
                <p style={{color:"#595A5E", fontSize:"1rem", margin:"0"}}>{details.miles} miles away</p>
            </div>
            <div style={{float:"right"}}>
                <img className="tile-rating" src={star} alt = ""/>
                <p className="tile-rating" style={{fontSize:"1.5rem"}}>{details.rating}</p>
            </div>
        </div>
    );
}

export default SpaceTile;