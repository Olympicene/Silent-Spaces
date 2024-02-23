import React from 'react';
import {useState} from 'react';
import { Link } from "react-router-dom";
import './styles.css';
import studyimage from "../assets/abtractPeoplePeerProgramming.svg";


const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = event => {
        setUsername(event.target.value);
      };

      const handlePassword = event => {
        setPassword(event.target.value);
      };

    const handleClick = () => {
        console.log(username);
        console.log(password);
        // todo keeping track of username and password for backend
      }
    return (
        <div className='login-container'>
            <div className='left-half'>
                <h1 className='login-title'>LOGIN</h1>

                <div className='login-input'>
                    <input id="first-name" 
                        type="text" 
                        placeholder="Username/Email" 
                        onChange={handleUsername}/>
                    <input id="first-name" 
                        type="password" 
                        placeholder="Password" 
                        onChange={handlePassword}
                        style={{marginBottom : "4rem"}}/>
                </div>
                
                <div className='button-div'>
                    <button className='forgot-pw-button'>Forgot your Password?</button>
                    <Link to="/menu">
                    <button className='login-button' onClick={handleClick}>LOG IN</button>
                    </Link>
                    
                </div>

            </div>

            <div className='right-half'>
                <img className = 'peerprogram-img' src={studyimage}></img>
            </div>
        </div>
    )
}

export default LogIn;