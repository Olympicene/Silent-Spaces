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
import { IconContext } from 'react-icons';
import Rating from '@mui/material/Rating';
import styles from "./FavoriteTile.module.css"
import Tag from '../../components/Tag/Tag';



const FavoriteTile = ({data, path}) => {

    let nameToDisplay = ""
    if (data.name.length > 30) {
        nameToDisplay = data.name.slice(0,30) + "..";
    }
    else {
        nameToDisplay = data.name;
    }

    return(
        <Link to = {path} style={{ textDecoration: 'none' }}>
        <IconContext.Provider value={{size:"1.5rem"}}>
        <div className={styles['favoritetile-main']}>
            <div className={styles['favtile-img']}>
                <img src={data.img[0]} alt = "" style={{width:"100%", objectFit: "cover"}}/>
                <Heart isClick={true} styles={{position:"absolute", right:"-25px", top:"-30px", }} />
            </div>

            <div className={styles['favtile-middle']}>
                <div>
                    <h2>{nameToDisplay}</h2>
                </div>
                <div className={styles['favtile-location']}>
                    <FaLocationDot className={styles['favtile-loc-icon']} />
                    <h3>{data.address}</h3>
                </div>
                <div className={styles['favtile-rating']}>
                    <h2>{data.rating}</h2>
                </div>
            </div>
            
            <div className={styles['favtile-stats']}>
                <div className={styles['favtile-stats-tile']}>
                    <FaVolumeHigh style={{marginLeft: "20px", color: "black", height: "3rem"}}/>
                    <Rating name="size-large" readOnly value={data.statistics.noiseLevels} sx={{
                        fontSize: "2rem",
                        '& .MuiRating-iconFilled': {
                            color: 'black',
                        },
                    }} />  
                    <FaVolumeMute style={{marginRight: "20px", color: "black", height: "3rem"}}/>
                </div>

                <div className={styles['favtile-stats-tile']}>
                    <MdOutlinePeople style={{marginLeft: "20px", color: "black", height: "3rem"}}/>
                    <Rating readOnly value={data.statistics.occupancy} sx={{
                        fontSize: "2rem",
                        '& .MuiRating-iconFilled': {
                            color: 'black',
                        },
                    }} />
                    <MdOutlinePersonOff style={{marginRight: "20px", color: "black", height: "3rem"}}/>
                </div>

                <div className={styles['favtile-stats-tile']}>
                    <PiWifiSlashBold style={{marginLeft: "20px", color: "black", height: "3rem"}}/>
                    <Rating readOnly value={data.statistics.connectivity} sx={{
                        fontSize: "2rem",
                        '& .MuiRating-iconFilled': {
                            color: 'black',
                        },
                    }} />
                    <PiWifiHighBold style={{marginRight: "20px", color: "black", height: "3rem"}}/>
                </div>
            </div>
        
         </div>
         </IconContext.Provider>
        </Link>
    );
}
export default FavoriteTile