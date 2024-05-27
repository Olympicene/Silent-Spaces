import React from "react";
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
import { Star} from "@mui/icons-material";



const FavoriteTile = ({ data, path }) => {

    return (
        <Link to={path} style={{ textDecoration: 'none' }}>
            <IconContext.Provider value={{ size: "2rem" }}>
                <div className={styles['favoritetile-main']}>

                    <div className={styles['favtile-img']}>
                        <img src={data.img[0]} alt="" style={{ width: "100%", objectFit: "cover" }} />
                        <Heart isClick={true} styles={{ position: "absolute", right: "-25px", top: "-30px", }} />
                    </div>

                    <div className={styles['favtile-middle']}>
                        <div>
                            <h2 className={styles['favtile-header']}>{data.name}</h2>

                            <div className={styles['favtile-location']}>
                                <FaLocationDot className={styles['favtile-loc-icon']} />
                                <h3 style={{ color: "black", fontSize: "1.25rem" }}>{data.address}</h3>
                            </div>
                        </div>
                        <div className={styles['favtile-rating']}>
                            <Star sx={{height: "4rem", color: "white", marginRight: "0.5rem"}}/>
                            <h2>{data.rating.toFixed(1)}</h2>
                        </div>
                    </div>

                    <div className={styles['favtile-stats']}>
                        <div className={styles['favtile-stats-tile']}>
                            <FaVolumeHigh style={{ marginLeft: "20px", color: "black", height: "4rem" }} />
                            <Rating precision={0.5} name="size-large" readOnly value={data.statistics.noiseLevels} sx={{
                                fontSize: "3rem",
                                '& .MuiRating-iconFilled': {
                                    color: 'black',
                                },
                                margin: "0 1rem"
                            }} />
                            <FaVolumeMute style={{ marginRight: "20px", color: "black", height: "4rem" }} />
                        </div>

                        <div className={styles['favtile-stats-tile']}>
                            <MdOutlinePeople style={{ marginLeft: "20px", color: "black", height: "4rem" }} />
                            <Rating precision={0.5} readOnly value={data.statistics.occupancy} sx={{
                                fontSize: "3rem",
                                '& .MuiRating-iconFilled': {
                                    color: 'black',
                                },
                                margin: "0 1rem"
                            }} />
                            <MdOutlinePersonOff style={{ marginRight: "20px", color: "black", height: "4rem" }} />
                        </div>

                        <div className={styles['favtile-stats-tile']}>
                            <PiWifiSlashBold style={{ marginLeft: "20px", color: "black", height: "4rem" }} />
                            <Rating precision={0.5} readOnly value={data.statistics.connectivity} sx={{
                                fontSize: "3rem",
                                '& .MuiRating-iconFilled': {
                                    color: 'black',
                                },
                                margin: "0 1rem"
                            }} />
                            <PiWifiHighBold style={{ marginRight: "20px", color: "black", height: "3rem" }} />
                        </div>
                    </div>

                </div>
            </IconContext.Provider>
        </Link>
    );
}
export default FavoriteTile