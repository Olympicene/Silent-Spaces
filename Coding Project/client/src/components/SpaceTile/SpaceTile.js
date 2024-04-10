import React, {useState} from "react";
import studySpace from "../../assets/studyspace.svg";
import star from "../../assets/blackstar.svg";
import './SpaceTile.css';
import { Link } from 'react-router-dom'
import Heart from "react-animated-heart";


const SpaceTile = ({details}) => {
    let nameToDisplay = ""

    const [isClick, setClick] = useState(false);
    if (details.name.length > 17) {
        nameToDisplay = details.name.slice(0,17) + "..";
    }
    else {
        nameToDisplay = details.name;
    }
    
    return (
        <div className="space-tile">
            <Link to = {details.path} style={{ textDecoration: 'none' }}>
            <div className="spacetile-image" >
                <img src={(details.img === undefined ? studySpace : details.img)} alt = "" style={{width:"100%", objectFit: "cover"}}/>
            </div>
            <div style={{float:"left"}} >
                <p style={{color: "black", fontSize:"1.5rem", marginBottom:"1rem", textOverflow: "ellipsis", whiteSpace:"nowrap"}}>{(details.name === undefined? "N/A" : nameToDisplay)}</p>
                <p style={{color:"#595A5E", fontSize:"1rem", margin:"1rem", position: "absolute", bottom: 0, left: 0}}>{details.miles} miles away</p>
            </div>
            <div style={{position: "absolute", bottom: "-1rem", right: "0", marginRight:"1rem"}}>
                <img className="tile-rating" src={star} alt = ""/>
                <p className="tile-rating" style={{color: "black", fontSize:"1.5rem"}}>{(details.rating === undefined? "N/A" : details.rating)}</p>
                <Heart isClick={isClick} onClick={() => setClick(!isClick)} styles={{position:"absolute", left:0, top:"-3.5rem"}} />
            </div>
            </Link>
        </div>
    );
}

export default SpaceTile;