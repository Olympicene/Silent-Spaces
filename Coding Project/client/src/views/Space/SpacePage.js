import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import NavBar from '../../components/NavBar/NavBar';
import { Link } from "react-router-dom";
import { IconContext } from 'react-icons';
import { IoIosArrowBack } from "react-icons/io";
import star from "../../assets/blackstar.svg";
import Tag from '../../components/Tag/Tag';
import Amenity from '../../components/Amenity/Amenity';

import {useParams} from "react-router-dom";
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import Button from '../../components/Button/Button'
import Popup from '../../components/Popup/Popup';
import SpaceStats from '../../components/SpaceStats/SpaceStats';
import styles from "./Space.module.css"
import SpaceLive from '../../components/SpaceLive/SpaceLive';
import { Person, Outlet, Tv, CoPresent, Fastfood, Print, MeetingRoom, Wc, Group } from "@mui/icons-material";
import MyGallery from '../../components/ImageGallery/ImageGallery';


const SpacePage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
    });
    const [spaceData, setSpaceData] = useState({});

    const checkAuth = async () => {
        try {
            const response = await fetch('http://localhost:5005/auth/user', {
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

    const getSpace = async () => {
        try {
            const response = await fetch(`http://localhost:5005/space/space-info/${id}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Auth failed');
            }

            const res = await response.json();
            console.log(res.data[0])
            setSpaceData(res.data)


        } catch (error) {
            console.error(error);
            navigate('/log-in');
        }
    };

    useEffect(() => {
        checkAuth();
        getSpace();
    }, []);


    const [anchor, setAnchor] = useState(null);

    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const open = Boolean(anchor);
    const popupState = open ? 'simple-popper' : undefined;


    return (
         
        <div className={styles['spacePage']}>
            <NavBar info={userData} page="home"/>
            <div style={{marginLeft : "20vw"}}  className={styles['space-content']}>
                <IconContext.Provider value={{color:"grey", size:"1.5rem"}}>
                <div className={styles['space-menu-bar']}>
                    <Link onClick={() => navigate(-1)}>
                        <IoIosArrowBack />
                    </Link>
                    {/* <div className={styles['interactables']}>

                        <IoShareSocialOutline />
                        <Heart isClick={isClick} onClick={() => setClick(!isClick)} styles={{position:"relative", marginRight: "-20px"}} />
                    </div> */}
                </div>
                </IconContext.Provider>
                { spaceData.img &&
                <div className={styles['imageCarousel']}>
                    <MyGallery img={spaceData.img}></MyGallery>
                </div>}

                <div className={styles['space-info']}>
                    <div className={styles['space-labels']}>

                        {/* MAIN INFO */}
                        <div className={styles['space-main-label']}>

                            { spaceData.name && spaceData.rating &&
                            <div className={styles['space-name-rating']}>
                                <p style={{fontSize: "50px", textOverflow: "ellipsis",}}> {spaceData.name.length > 17 ? spaceData.name.slice(0,26) + ".." : spaceData.name}</p>
                                <p style={{fontSize:"50px"}}> <img className={styles['tile-rating']} src={star} style= {{width : "40px"}} alt = ""/> {spaceData.rating.toFixed(1)}</p>
                            </div>}
                            
                            {spaceData.address && spaceData.location && spaceData.reviews &&
                            <div className={styles['space-address']}>
                                <p style={{fontSize:"34px", color:"grey"}}> {spaceData.address}</p>
                                <p style={{fontSize:"24px", color:"grey"}}>73 miles away - {spaceData.reviews.length} {spaceData.reviews.length === 1 ? "review" : "reviews"}</p>
                            </div>}

                        </div>
                        
                        {/* DESCRIPTION */}
                        { spaceData.desc &&
                        <div className={styles['space-description']}>
                                <p>{spaceData.desc}</p>
                        </div>}

                        {/* TAGS */}
                        { spaceData.tags &&
                        <div className={styles['space-tags']}>
                            {spaceData.tags.map((item, index) => (
                                <Tag>{item}</Tag>
                            ))}
                        </div>}

                        {/* AMENETIES */}
                        { spaceData.amenities &&
                        <div className={styles['space-ameneties']}>
                            <div style={{width: "100%"}}>
                                <p style={{color:"black", fontSize:"30px", margin: 10}}>amenities:</p>  
                            </div>
                            <div className={styles['space-ameneties-list']}>
                                {spaceData.amenities.has_outlets === true && <Amenity> <Outlet fontSize="large" style={{marginRight: "20px"}}/>outlets</Amenity>}
                                {spaceData.amenities.has_whiteboards === true && <Amenity> <CoPresent fontSize="large" style={{marginRight: "20px"}}/>whiteboards</Amenity>}
                                {spaceData.amenities.has_screen === true && <Amenity> <Tv fontSize="large" style={{marginRight: "20px"}}/>screens</Amenity>}
                                {spaceData.amenities.is_food_beverage_friendly == true && <Amenity> <Fastfood fontSize="large" style={{marginRight: "20px"}}/>allows food</Amenity>}
                                {spaceData.amenities.has_printer === true && <Amenity> <Print fontSize="large" style={{marginRight: "20px"}}/>printers</Amenity>}
                                {spaceData.amenities.has_breakout_rooms === true && <Amenity> <MeetingRoom fontSize="large" style={{marginRight: "20px"}}/>breakout rooms</Amenity>}
                                {spaceData.amenities.restrooms === true && <Amenity> <Wc fontSize="large" style={{marginRight: "20px"}}/>restrooms</Amenity>}
                                {spaceData.amenities.seating_type === 'group-seating' && <Amenity> <Group fontSize="large" style={{marginRight: "20px"}}/>group seating</Amenity>}
                                {spaceData.amenities === 'individual-seating' && <Amenity> <Person fontSize="large" style={{marginRight: "20px"}}/>single seating</Amenity>}


                            </div>
                        </div>
                        }
                    </div>
                    <div className={styles['space-ratings']}>
                    { spaceData.statistics &&
                        <SpaceStats statistics={spaceData.statistics}></SpaceStats>
                    }
                    <SpaceLive></SpaceLive>
                    <Button theme="contrast" style={{width: "95%", marginLeft: 20}} onClick={handleClick}> Check-In </Button>
                    <BasePopup id={popupState} open={open} anchor={anchor}>
                        <Popup/>
                    </BasePopup>
                </div>
            </div>
            <div className={styles['space-reviews']}>

            </div>
                </div>
            </div>
    );
};

export default SpacePage;