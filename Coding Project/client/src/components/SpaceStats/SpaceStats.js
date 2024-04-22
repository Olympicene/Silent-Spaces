import React, {useState} from "react";

import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeHigh } from "react-icons/fa6";
import { MdOutlinePersonOff } from "react-icons/md";
import { MdOutlinePeople } from "react-icons/md";
import { PiWifiSlashBold } from "react-icons/pi";
import { PiWifiHighBold } from "react-icons/pi";
import { IoShareSocialOutline } from "react-icons/io5";
import { IconContext } from 'react-icons';
import Rating from '@mui/material/Rating';
import styles from "./SpaceStats.module.css"



const SpaceStats = ({statistics, style}) => {   

    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);

    const LoudnessLabels = {
        0.5: 'Extremely Loud',
        1: 'Deafening',
        1.5: 'Very Loud',
        2: 'Loud',
        2.5: 'Average Noise',
        3: 'Moderate Noise',
        3.5: 'Low Noise',
        4: 'Quiet',
        4.5: 'Very Quiet',
        5: 'Silent',
    };
    
    const CrowdednessLabels = {
        0.5: 'Extremely Crowded',
        1: 'Very Crowded',
        1.5: 'Crowded',
        2: 'Busy',
        2.5: 'Average Crowds',
        3: 'Moderate Crowds',
        3.5: 'Low Crowds',
        4: 'Sparse',
        4.5: 'Nearly Empty',
        5: 'Empty',
    };

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
    
    return (
            <IconContext.Provider value={{color:"grey", size:"3rem"}}>
            <div className={styles['space-stats']}> 
                
                <div>
                    <FaVolumeHigh style={{marginRight: "20px", color: "black"}}/>
                    <Rating readOnly value={statistics.noiseLevels} defaultValue={2} sx={{
                        fontSize: "3.5rem",
                        '& .MuiRating-iconFilled': {
                            color: 'black',
                          },
                    }} />  
                    <FaVolumeMute style={{marginLeft: "20px", color: "black"}}/>
                </div>
                <p className={styles['space-stats-label']}>
                    {LoudnessLabels[statistics.noiseLevels]}
                </p>
                
                {/* CROWD STATUS */}
                <div>
                    <MdOutlinePeople style={{marginRight: "20px", color: "black", height: "3rem"}}/>
                    <Rating readOnly value={statistics.occupancy} sx={{
                        fontSize: "3.5rem",
                        '& .MuiRating-iconFilled': {
                            color: 'black',
                          },
                    }} />
                    <MdOutlinePersonOff style={{marginLeft: "20px", color: "black", height: "3rem"}}/>
                </div>
                <p className={styles['space-stats-label']}>
                {CrowdednessLabels[statistics.occupancy]}
                </p>

                {/* WIFI STATUS */}
                <div>
                    <PiWifiSlashBold style={{marginRight: "20px", color: "black", height: "3rem"}}/>
                    <Rating name="hover-feedback"
                        value={value}
                        precision={0.5}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                        setHover(newHover);
                        }}
                        sx={{
                            fontSize: "3.5rem",
                            '& .MuiRating-iconFilled': {
                                color: 'black',
                              },
                        }}
                    />
                    <PiWifiHighBold style={{marginLeft: "20px", color: "black", height: "3rem"}}/>
                </div>
                <p className={styles['space-stats-label']}>
                    {Wifilabels[hover !== -1 ? hover : value]}
                </p>
            </div>
            </IconContext.Provider>
    );
}

export default SpaceStats;
