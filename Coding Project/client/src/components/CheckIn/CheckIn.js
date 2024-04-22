import React, {useState} from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';
import Button from '../Button/Button';
import styles from './CheckIn.module.css';
import { useNavigate } from "react-router-dom";

export default function CheckIn({space_id, user}) {
    const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [loud, setLoud] = useState(0);
  const [people, setPeople] = useState(0);
  const [wifi, setWifi] = useState(0);

  const handleLoud = (event) => {
    setLoud(event.target.value);
  };

  const handlePeople = (event) => {
    setPeople(event.target.value);
  };

  const handleWifi = (event) => {
    setWifi(event.target.value);
  };

  const handleCheckIn = async () => {

    try {
        const response = await fetch(`http://localhost:5005/checkin/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                "id": 0,
                "space_id": space_id,
                "username": user,
                "noiseLevels": Number(loud),
                "occupancy": Number(people),
                "connectivity": Number(wifi)
            })
        });

        if (!response.ok) {
            console.log("error")
            }
        setOpen(false);
        } catch (error) {
        console.error(error);
        navigate('/log-in');
    }
  }

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
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
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h1"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Check In!
          </Typography>
          <div className={styles['checkin-container']}>
            <Typography id="modal-desc" level="h2">
                How loud is it?
            </Typography>
            <Input size="lg" placeholder="enter here" type="number" onChange={handleLoud} variant="soft" />
          </div>

          <div className={styles['checkin-container']}>
            <Typography id="modal-desc" level="h2">
                How many people are there?
            </Typography>
            <Input size="lg" placeholder="enter here" type="number" onChange={handlePeople} variant="soft" />
          </div>
          
          <div className={styles['checkin-container']}>
            <Typography id="modal-desc" level="h2">
                How strong is your wifi connection?
            </Typography>
            <Input size="lg" placeholder="enter here" type="number" onChange={handleWifi} variant="soft" />
          </div>
          
          <div className={styles['checkin-submit-button']}>
            <Button theme="contrast" style={{ marginTop: "1rem", padding:"1rem"}} onClick={handleCheckIn}>submit</Button>
          </div>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
