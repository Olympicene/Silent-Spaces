import React from "react";
import spaceimg from "../../assets/space.svg";
import { Link } from 'react-router-dom';
import Heart from "react-animated-heart";
import { FaLocationDot } from "react-icons/fa6";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeHigh } from "react-icons/fa6";
import { MdOutlinePersonOff } from "react-icons/md";
import { MdOutlinePeople } from "react-icons/md";
import { PiWifiSlashBold } from "react-icons/pi";
import { PiWifiHighBold } from "react-icons/pi";
import { IoShareSocialOutline } from "react-icons/io5";
import { IconContext } from 'react-icons';
import Rating from '@mui/material/Rating';



const FavoriteTile = ({details, path}) => {
    require("./FavoriteTile.css");

    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);

    const Wifilabels = {
        0.5: 'Useless',
        1: 'Nearly Useless',
        1.5: 'Very Slow',
        2: 'Slow',
        2.5: 'Usable',
        3: 'Decent',
        3.5: 'Good',
        4: 'Very Good',
        4.5: 'Fast',
        5: 'Very Fast',
      };

    function getLabelText() {
        return `${value} Star${value !== 1 ? 's' : ''}, ${Wifilabels[value]}`;
    }
    return(
        <Link to = {path} style={{ textDecoration: 'none' }}>
        <div className="favoritetile-main">
            <div className="favtile-img">
                <img src={spaceimg} alt = ""/>
                <Heart isClick={true} styles={{position:"absolute", right:"-25px", top:"-30px", }} />
            </div>

            <div className="favtile-middle">
                <h2>sample study space</h2>
                <div className="favtile-location">
                    <FaLocationDot className="favtile-loc-icon" />
                    <h3>410 s morgan st</h3>
                </div>
                <div className="favtile-rating">
                    <h2>4.3</h2>
                </div>
            </div>
            
            <div className="favtile-stats">
                <div className="favtile-stats-tile">
                    <div>
                        <FaVolumeHigh style={{marginRight: "20px", color: "black"}}/>
                        <Rating name="size-large" readOnly defaultValue={2} sx={{
                            fontSize: "2rem",
                            '& .MuiRating-iconFilled': {
                                color: 'black',
                            },
                        }} />  
                        <FaVolumeMute style={{marginLeft: "20px", color: "black"}}/>
                    </div>
                </div>

                <div className="favtile-stats-tile">
                    <div>
                        <MdOutlinePeople style={{marginRight: "20px", color: "black", height: "3rem"}}/>
                        <Rating readOnly value={2} sx={{
                            fontSize: "2rem",
                            '& .MuiRating-iconFilled': {
                                color: 'black',
                            },
                        }} />
                        <MdOutlinePersonOff style={{marginLeft: "20px", color: "black", height: "3rem"}}/>
                    </div>
                </div>

                <div className="favtile-stats-tile">
                    <div>
                        <PiWifiSlashBold style={{marginRight: "20px", color: "black", height: "3rem"}}/>
                        <Rating readOnly value={2} sx={{
                            fontSize: "2rem",
                            '& .MuiRating-iconFilled': {
                                color: 'black',
                            },
                        }} />
                        <PiWifiHighBold style={{marginLeft: "20px", color: "black", height: "3rem"}}/>
                    </div>
                </div>

            </div>
        
         </div>
        </Link>
    );
}
export default FavoriteTile