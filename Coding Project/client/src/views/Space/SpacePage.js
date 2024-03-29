import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import NavBar from '../../components/NavBar/NavBar';
import { Link } from "react-router-dom";
import { IconContext } from 'react-icons';
import { IoIosArrowBack } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import star from "../../assets/blackstar.svg";
import Tag from '../../components/Tag/Tag';
import Amenity from '../../components/Amenity/Amenity';
import Button from '../../components/Button/Button'
import Popup from '../../components/Popup/Popup';
import { Slider } from '@mui/material';

import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeHigh } from "react-icons/fa6";
import { MdOutlinePersonOff } from "react-icons/md";
import { MdOutlinePeople } from "react-icons/md";
import { PiWifiSlashBold } from "react-icons/pi";
import { PiWifiHighBold } from "react-icons/pi";

const SpacePage = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
    });

    const checkAuth = async () => {
        try {
            const response = await fetch('http://localhost:5005/v1/user', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Auth failed');
            }

            const res = await response.json();

            console.log(res)

            const updatedUserData = {
                first_name: res.data[0].first_name,
                last_name: res.data[0].last_name,
                email: res.data[0].email,
            };

            setUserData(updatedUserData);

        } catch (error) {
            console.error(error);
            navigate('/log-in');
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);



    require('./Space.css')

    const [anchor, setAnchor] = useState(null);

    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popper' : undefined;


    return (
        <div className='spacePage'>
            <NavBar info={userData}/>
            <div style={{marginLeft : "20vw"}}  className='space-content'>
                <IconContext.Provider value={{color:"grey", size:"1.5rem"}}>
                <div className='space-menu-bar'>
                    <Link to="/menu">
                        <IoIosArrowBack />
                    </Link>
                    <div className='interactables'>
                        <div>
                            <IoShareSocialOutline />
                            <u>share</u>
                        </div>
                        <div>
                            <FaRegHeart/>
                            <u>save</u>
                        </div>
                    </div>
                </div>
                </IconContext.Provider>
                <div className='imageCarousel'>
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FuMxoInU-cwU%2Fmaxresdefault.jpg%3Fsqp%3D-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGHIgQSg1MA8%3D%26rs%3DAOn4CLA2ogBMU0cOd32Y2-eoHiZYPb1oFw&f=1&nofb=1&ipt=d33387150872cf642351c496057c4085d1294a37e3f23198fff957bfc6cbcfc0&ipo=images" alt="" />
                </div>
                <div className='space-info'>
                    <div className='space-labels'>
                        <div className='space-main-label'>
                            <div>
                                <p style={{fontSize:"50px", margin: 20}}> Example Study Space</p>
                                <p style={{color:"grey", fontSize:"34px", margin: 20}}>123 Sesame Street</p>
                            </div>
                            <div style={{textAlign: 'right'}}>
                                <p style={{fontSize:"50px", margin: 20}}> <img className="tile-rating" src={star} style= {{width : "40px"}} alt = ""/> 4.3</p>
                                <p style={{color:"grey", fontSize:"34px", margin: 20}}>73 Miles away</p>
                            </div>
                        </div>
                        <div className='space-tags'>
                            <Tag>crowd favorite</Tag>
                            <Tag>coffee shop</Tag>
                            <Tag>group-friendly</Tag>
                            <Tag>comfy</Tag>
                            <Tag>locally-owned</Tag>
                            <Tag>2024 Winner</Tag>
                        </div>
                        <div className='space-ameneties'>
                            <p style={{color:"black", fontSize:"30px", margin: 20}}>amenities:</p>
                            <div className='space-ameneties-list'>
                                <Amenity>power outlets</Amenity>
                                <Amenity>drinks allowed</Amenity>
                                <Amenity>whiteboards</Amenity>
                                <Amenity>printers</Amenity>
                                <Amenity>coffee machine</Amenity>
                                <Amenity>free computers</Amenity>
                            </div>
                        </div>
                    </div>
                    <div className='space-ratings'>
                        <IconContext.Provider value={{color:"grey", size:"3rem"}}>
                        <div className='space-stats'> 
                            
                            <div>
                                <FaVolumeMute />
                                <div className='space-stats-sound'>
                                    <Slider disabled defaultValue={60} aria-label="Disabled slider" color="secondary" />
                                </div>
                                <FaVolumeHigh />
                            </div>


                            <div>
                                <MdOutlinePersonOff />
                                <div className='space-stats-crowd'>
                                    <Slider disabled defaultValue={50} aria-label="Disabled slider" color="secondary" />
                                </div>
                                <MdOutlinePeople />
                            </div>

                            <div>
                            <PiWifiSlashBold />
                            <div className='space-stat-wifi'>
                                <Slider disabled defaultValue={80} aria-label="Disabled slider" color="secondary" />
                            </div>
                            <PiWifiHighBold />
                            </div>

                             
                            
                        </div>
                        </IconContext.Provider>

                        <div>
                            <Button theme="contrast" style={{width: "95%", margin: 20}} onClick={handleClick}> Review </Button>
                            <BasePopup id={id} open={open} anchor={anchor}>
                                <Popup/>
                            </BasePopup>
                        </div>

                    </div>
                </div>
            </div>
        </div>  
    );
};

export default SpacePage;