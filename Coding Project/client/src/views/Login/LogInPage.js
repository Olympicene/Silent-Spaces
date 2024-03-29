import React from 'react';
import Login from './LoginForm';
import './Login.css';
import studyimage from "../../assets/abtractPeoplePeerProgramming.svg";


const LogIn = () => {

    return (
        <div className='login-container'>
            <div className='left-half'>
                <h1 className='login-title'>LOGIN</h1>
                <Login/>
            </div>
            
            <div className='right-half'>
                <img alt = "some people studying" className = 'peerprogram-img' src={studyimage}></img>
            </div>
        </div>
    )
}

export default LogIn;