import React, {useState} from 'react';
import { Slider } from '@mui/material';
import { IconContext } from 'react-icons';
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeHigh } from "react-icons/fa6";
import { MdOutlinePersonOff } from "react-icons/md";
import { MdOutlinePeople } from "react-icons/md";
import { PiWifiSlashBold } from "react-icons/pi";
import { PiWifiHighBold } from "react-icons/pi";
import Button from '../../components/Button/Button'
import InputBox from '../InputBox/InputBox';

export default function Popup() {
    require('./Popup.css')
    const [volume, setVolume] = useState(0);
    const [people, setPeople] = useState(0);
    const [wifi, setWifi] = useState(0);

    const [review, setReview] = useState("");

    const handleVolume = (event, newValue) => {
        setVolume(newValue);
    };

    const handlePeople = (event, newValue) => {
        setPeople(newValue);
    };

    const handleWifi = (event, newValue) => {
        setWifi(newValue);
    };

    const handleChange = (e) => {
        setReview(e.target.value);
      };
    
  return (
    <div className='popup'>
        <div className='each-stats'>

            <IconContext.Provider value={{color:"black", size:"3rem"}}>
            <p>noise</p>
            <div>
                <FaVolumeMute />
                <div>
                    <Slider aria-label="Volume" value={volume} onChange={handleVolume}/>
                </div>
                <FaVolumeHigh />
            </div>

            <p>people</p>
            <div>
                <MdOutlinePersonOff />
                <div>
                    <Slider aria-label="Volume" value={people} onChange={handlePeople}/>            
                </div>
                <MdOutlinePeople />
            </div>
            
            <p>wifi</p>
            <div>
            <PiWifiSlashBold />
            <div>
                <Slider aria-label="Volume" value={wifi} onChange={handleWifi}/>
            </div>
            <PiWifiHighBold />
            </div>
            </IconContext.Provider>

        </div>
        <p className='p-popup'>select amenities:</p>
        <div className='all-amenities-list'>
            <Button theme="light" style={{padding: 10, margin: 10, fontSize: "25px"}}>outlets</Button>
            <Button theme="light" style={{padding: 10, margin: 10, fontSize: "25px"}}>whiteboards</Button>
            <Button theme="light" style={{padding: 10, margin: 10, fontSize: "25px"}}>printers</Button>
            <Button theme="light" style={{padding: 10, margin: 10, fontSize: "25px"}}>long tables</Button>
            <Button theme="light" style={{padding: 10, margin: 10, fontSize: "25px"}}>drinks allowed</Button>
        </div>
        <p className='p-popup'>leave a review:</p>
        <InputBox features={{id:"review", name:"review", type:"text", placeholder:"enter text here"}} change={handleChange} 
        style={{backgroundColor: "#254D32", color: "#ffff"}}/>
        <Button theme="contrast" style={{width: "50%", margin: 20}}>add rating</Button>
    </div>
  )
}
