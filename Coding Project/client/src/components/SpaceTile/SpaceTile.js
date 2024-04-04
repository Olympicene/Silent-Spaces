import React, {useState} from "react";
import studySpace from "../../assets/studyspace.svg";
import star from "../../assets/blackstar.svg";
import './SpaceTile.css';
import { Link } from 'react-router-dom'
import Heart from "react-animated-heart";


const SpaceTile = ({details}) => {

    const [isClick, setClick] = useState(false);
    if (details.name.length > 24) {
        details.name = details.name.slice(0,24) + "...";
    }
    
    return (
        <div className="space-tile">
            <Link to = {details.path} style={{ textDecoration: 'none' }}>
            {/* <Heart isClick={isClick} onClick={() => setClick(!isClick)} /> */}
            <div className="spacetile-image" >
                <img src={(details.img === undefined ? studySpace : details.img)} alt = "" style={{width:"100%", objectFit: "cover"}}/>
            </div>
            <div style={{float:"left"}} >
                <p style={{color: "black", fontSize:"1.5rem", marginBottom:"1rem", textOverflow: "ellipsis", whiteSpace:"nowrap"}}>{(details.name === undefined? "N/A" : details.name)}</p>
                <p style={{color:"#595A5E", fontSize:"1rem", margin:"1rem", position: "absolute", bottom: 0, left: 0 }}>{details.miles} miles away</p>
            </div>
            <div style={{position: "absolute", bottom: "-1rem", right: "0", marginRight:"1rem" }}>
                <img className="tile-rating" src={star} alt = ""/>
                <p className="tile-rating" style={{color: "black", fontSize:"1.5rem"}}>{(details.rating === undefined? "N/A" : details.rating)}</p>
            </div>
            </Link>
        </div>
    );
}

export default SpaceTile;