import React, {useState} from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Button from '../Button/Button';
import { useNavigate } from "react-router-dom";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeHigh } from "react-icons/fa6";
import { MdOutlinePersonOff } from "react-icons/md";
import { MdOutlinePeople } from "react-icons/md";
import { PiWifiSlashBold } from "react-icons/pi";
import { PiWifiHighBold } from "react-icons/pi";
import Rating from '@mui/material/Rating';
import styles from './Rating.module.css';
import { IconContext } from 'react-icons';
import Input from '@mui/joy/Input';

export default function RatingPage({space_id, user}) {
    const navigate = useNavigate();
  const [ratingopen, setRatingOpen] = useState(true);
  const [starloud, setStarLoud] = useState(2);
  const [starpeople, setStarPeople] = useState(2);
  const [starwifi, setStarWifi] = useState(2);
  const [review, setReview] = useState("");

  const handleReview = (event) => {
    setReview(event.target.value);
  };


  const addRating = async () => {
    try {
        const response = await fetch("http://silentspaces.info:5005/review/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              "review_id": 100,
              "space_id": space_id,
              "username": user,
              "comment": review,
              "amenities": {
                "has_outlets": true,
                "has_whiteboards": false,
                "has_screen": false,
                "is_food_beverage_friendly": true,
                "has_printer": false,
                "has_breakout_rooms": true,
                "restrooms": true,
                "seating_type": "Group Seating"
              },
              "statistics": {
                "noiseLevels": Number(starloud),
                "occupancy": Number(starpeople),
                "connectivity": Number(starwifi)
              }
            })
        });

        if (!response.ok) {
            console.log("error")
            }
        setRatingOpen(false);
        } catch (error) {
        console.error(error);
        navigate('/log-in');
    }
  }

  return (
    <React.Fragment>
      <IconContext.Provider value={{color:"black", size:"3rem"}}>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={ratingopen}
        onClose={() => setRatingOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <Typography
            component="h2"
            id="modal-title"
            level="h1"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Add your Rating!
          </Typography>
          <div className={styles['rating-container']}>
                <Typography id="modal-desc" level="h2">
                    How loud is it?
                </Typography>
                <div>
                    <FaVolumeHigh style={{marginRight: "20px", color: "black"}}/>
                    <Rating precision={0.5} defaultValue={2} 
                        value={starloud}
                        onChange={(event, newValue) => {
                          setStarLoud(newValue);
                        }}
                        sx={{
                        fontSize: "3.5rem",
                        '& .MuiRating-iconFilled': {
                            color: 'black',
                        },
                    }} />  
                    <FaVolumeMute style={{marginLeft: "20px", color: "black"}}/>
                </div>
          </div>

          <div className={styles['rating-container']}>
                <Typography id="modal-desc" level="h2">
                    How many people are there?
                </Typography>
                <div className={styles['rating-stars']}>
                        <MdOutlinePeople style={{marginRight: "20px", color: "black", height: "3rem"}}/>
                        <Rating precision={0.5}
                        value={starpeople}
                        onChange={(event, newValue) => {
                          setStarPeople(newValue);
                        }}
                        sx={{
                            fontSize: "3.5rem",
                            '& .MuiRating-iconFilled': {
                                color: 'black',
                            },
                        }} />
                        <MdOutlinePersonOff style={{marginLeft: "20px", color: "black", height: "3rem"}}/>
                </div>
           </div>
          
          <div className={styles['rating-container']}>
                <Typography id="modal-desc" level="h2">
                    How strong is your wifi connection?
                </Typography>
                <div className={styles['rating-stars']}>
                        <PiWifiSlashBold style={{marginRight: "20px", color: "black", height: "3rem"}}/>
                        <Rating precision={0.5} value={starwifi}
                            onChange={(event, newValue) => {
                              setStarWifi(newValue);
                            }} sx={{
                            fontSize: "3.5rem",
                            '& .MuiRating-iconFilled': {
                                color: 'black',
                            },
                        }} />
                        <PiWifiHighBold style={{marginLeft: "20px", color: "black", height: "3rem"}}/>
                </div>
            </div>

            <div className={styles['rating-container']}>
              <Typography id="modal-desc" level="h2">
                    Leave a review!
              </Typography>
              <Input size="lg" placeholder="enter here" type="text" onChange={handleReview} variant="soft" />
            </div>
          
          <div className={styles['rating-submit-button']}>
            <Button theme="contrast" style={{ marginTop: "1rem", padding:"1rem"}} onClick={addRating}>submit</Button>
          </div>
        </Sheet>
      </Modal>
      </IconContext.Provider>
    </React.Fragment>
  );
}
