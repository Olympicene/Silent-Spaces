import React, {useState} from "react";
import './SpaceStats.css';

import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeHigh } from "react-icons/fa6";
import { MdOutlinePersonOff } from "react-icons/md";
import { MdOutlinePeople } from "react-icons/md";
import { PiWifiSlashBold } from "react-icons/pi";
import { PiWifiHighBold } from "react-icons/pi";
import { IoShareSocialOutline } from "react-icons/io5";
import { IconContext } from 'react-icons';
import Rating from '@mui/material/Rating';



const SpaceStats = ({stats, style}) => {   

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
    
    return (
            <IconContext.Provider value={{color:"grey", size:"3rem"}}>
            <div className='space-stats'> 
                
                <div>
                    <FaVolumeHigh style={{marginRight: "20px", color: "black"}}/>
                    <Rating name="size-large" readOnly defaultValue={2} sx={{
                        fontSize: "3.5rem",
                        '& .MuiRating-iconFilled': {
                            color: 'black',
                          },
                    }} />  
                    <FaVolumeMute style={{marginLeft: "20px", color: "black"}}/>
                </div>
                <p className="space-stats-label">
                    {Wifilabels[2]}
                </p>
                
                {/* CROWD STATUS */}
                <div>
                    <MdOutlinePeople style={{marginRight: "20px", color: "black", height: "3rem"}}/>
                    <Rating readOnly value={2} sx={{
                        fontSize: "3.5rem",
                        '& .MuiRating-iconFilled': {
                            color: 'black',
                          },
                    }} />
                    <MdOutlinePersonOff style={{marginLeft: "20px", color: "black", height: "3rem"}}/>
                </div>
                <p className="space-stats-label">
                    {Wifilabels[2]}
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
                <p className="space-stats-label">
                    {Wifilabels[hover !== -1 ? hover : value]}
                </p>
            </div>
            </IconContext.Provider>
    );
}

export default SpaceStats;
